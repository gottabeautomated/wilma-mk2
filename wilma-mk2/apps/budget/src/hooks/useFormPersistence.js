import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { LoggingService } from '../lib/logging';
// Get current authenticated user
const getCurrentUserId = async () => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            LoggingService.logError(error, { context: 'getCurrentUserId' });
            return null;
        }
        return user?.id || null;
    }
    catch (error) {
        LoggingService.logError(error, { context: 'getCurrentUserId' });
        return null;
    }
};
export const useFormPersistence = (formKey, options = {}) => {
    const { autoSaveInterval = 30000, // 30 seconds
    enableLocalStorage = true, onSaveSuccess, onSaveError } = options;
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [saveError, setSaveError] = useState(null);
    // Save to Supabase
    const saveToSupabase = useCallback(async (formData) => {
        try {
            const userId = await getCurrentUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }
            const { error } = await supabase
                .from('form_drafts')
                .upsert({
                user_id: userId,
                form_key: formKey,
                form_data: formData,
                updated_at: new Date().toISOString()
            });
            if (error) {
                throw error;
            }
            LoggingService.logDatabaseOperation('upsert', 'form_drafts', true, {
                formKey,
                userId,
                dataSize: JSON.stringify(formData).length
            });
            return true;
        }
        catch (error) {
            LoggingService.logError(error, {
                context: 'saveToSupabase',
                formKey,
                formData
            });
            throw error;
        }
    }, [formKey]);
    // Load from Supabase
    const loadFromSupabase = useCallback(async () => {
        try {
            const userId = await getCurrentUserId();
            if (!userId) {
                return null;
            }
            const { data, error } = await supabase
                .from('form_drafts')
                .select('form_data, updated_at')
                .eq('user_id', userId)
                .eq('form_key', formKey)
                .single();
            if (error) {
                if (error.code === 'PGRST116') {
                    // No data found - this is normal for new forms
                    return null;
                }
                throw error;
            }
            LoggingService.logDatabaseOperation('select', 'form_drafts', true, {
                formKey,
                userId,
                lastUpdated: data.updated_at
            });
            return data?.form_data || null;
        }
        catch (error) {
            LoggingService.logError(error, {
                context: 'loadFromSupabase',
                formKey
            });
            return null;
        }
    }, [formKey]);
    // Save to localStorage as fallback
    const saveToLocalStorage = useCallback((formData) => {
        if (!enableLocalStorage)
            return;
        try {
            const key = `wilma_form_${formKey}`;
            localStorage.setItem(key, JSON.stringify({
                data: formData,
                timestamp: new Date().toISOString()
            }));
        }
        catch (error) {
            LoggingService.logError(error, {
                context: 'saveToLocalStorage',
                formKey
            });
        }
    }, [formKey, enableLocalStorage]);
    // Load from localStorage
    const loadFromLocalStorage = useCallback(() => {
        if (!enableLocalStorage)
            return null;
        try {
            const key = `wilma_form_${formKey}`;
            const stored = localStorage.getItem(key);
            if (!stored)
                return null;
            const parsed = JSON.parse(stored);
            return parsed.data || null;
        }
        catch (error) {
            LoggingService.logError(error, {
                context: 'loadFromLocalStorage',
                formKey
            });
            return null;
        }
    }, [formKey, enableLocalStorage]);
    // Main save function
    const saveFormData = useCallback(async (formData, force = false) => {
        if (isSaving && !force)
            return;
        setIsSaving(true);
        setSaveError(null);
        try {
            // Always save to localStorage first (fast)
            saveToLocalStorage(formData);
            // Then save to Supabase (slower, can fail)
            await saveToSupabase(formData);
            setLastSaved(new Date());
            onSaveSuccess?.();
            LoggingService.logFormProgress('auto-save', formData);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setSaveError(errorMessage);
            onSaveError?.(error);
        }
        finally {
            setIsSaving(false);
        }
    }, [isSaving, saveToLocalStorage, saveToSupabase, onSaveSuccess, onSaveError]);
    // Load form data (try Supabase first, fallback to localStorage)
    const loadFormData = useCallback(async () => {
        try {
            // Try Supabase first
            const supabaseData = await loadFromSupabase();
            if (supabaseData) {
                return supabaseData;
            }
            // Fallback to localStorage
            const localData = loadFromLocalStorage();
            if (localData) {
                // If we have local data but no Supabase data, save to Supabase
                saveFormData(localData, true);
                return localData;
            }
            return null;
        }
        catch (error) {
            LoggingService.logError(error, {
                context: 'loadFormData',
                formKey
            });
            return loadFromLocalStorage(); // Final fallback
        }
    }, [formKey, loadFromSupabase, loadFromLocalStorage, saveFormData]);
    // Clear saved data
    const clearFormData = useCallback(async () => {
        try {
            const userId = await getCurrentUserId();
            if (userId) {
                await supabase
                    .from('form_drafts')
                    .delete()
                    .eq('user_id', userId)
                    .eq('form_key', formKey);
            }
            if (enableLocalStorage) {
                const key = `wilma_form_${formKey}`;
                localStorage.removeItem(key);
            }
            setLastSaved(null);
            setSaveError(null);
        }
        catch (error) {
            LoggingService.logError(error, {
                context: 'clearFormData',
                formKey
            });
        }
    }, [formKey, enableLocalStorage]);
    // Auto-save effect
    useEffect(() => {
        let autoSaveTimer;
        const startAutoSave = (formData) => {
            if (autoSaveInterval > 0 && formData && Object.keys(formData).length > 0) {
                autoSaveTimer = setTimeout(() => {
                    saveFormData(formData);
                }, autoSaveInterval);
            }
        };
        return () => {
            if (autoSaveTimer) {
                clearTimeout(autoSaveTimer);
            }
        };
    }, [autoSaveInterval, saveFormData]);
    return {
        // Main functions
        saveFormData,
        loadFormData,
        clearFormData,
        // State
        isSaving,
        lastSaved,
        saveError,
        // Manual save/load functions
        saveToSupabase,
        loadFromSupabase,
        saveToLocalStorage,
        loadFromLocalStorage,
        // Helper to trigger auto-save
        triggerAutoSave: (formData) => {
            if (autoSaveInterval > 0) {
                setTimeout(() => saveFormData(formData), autoSaveInterval);
            }
        }
    };
};
export default useFormPersistence;
