export class LoggingService {
    static init() {
        if (this.isInitialized)
            return;
        try {
            console.log('📝 Logging Service initialized (Console mode)');
            this.isInitialized = true;
        }
        catch (error) {
            console.error('❌ Failed to initialize Logging:', error);
        }
    }
    static logError(error, context) {
        try {
            console.error('🚨 Error logged:', error.message, context);
            // TODO: Add Sentry integration here when @sentry/react is installed
            // if (this.isInitialized && window.Sentry) {
            //   window.Sentry.captureException(error, { extra: context })
            // }
        }
        catch (loggingError) {
            console.error('Failed to log error:', loggingError);
        }
    }
    static logBudgetCalculation(budgetData, userId) {
        try {
            const logData = {
                message: 'Budget calculation started',
                category: 'budget',
                data: {
                    guestCount: budgetData.guestCount,
                    totalBudget: budgetData.totalBudget,
                    weddingStyle: budgetData.weddingStyle,
                    venueType: budgetData.venueType,
                    season: budgetData.season,
                    userId
                }
            };
            console.log('📊 Budget calculation:', logData);
        }
        catch (error) {
            console.error('Failed to log budget calculation:', error);
        }
    }
    static logFormProgress(step, formData, userId) {
        try {
            const logData = {
                message: `Form step completed: ${step}`,
                category: 'form',
                data: {
                    step,
                    fieldsCompleted: Object.keys(formData).length,
                    timestamp: new Date().toISOString(),
                    userId
                }
            };
            console.log('📝 Form progress:', logData);
        }
        catch (error) {
            console.error('Failed to log form progress:', error);
        }
    }
    static logPerformance(action, duration, context) {
        try {
            const logData = {
                message: `Performance: ${action}`,
                category: 'performance',
                data: {
                    action,
                    duration,
                    ...context
                }
            };
            console.log('⚡ Performance:', logData);
        }
        catch (error) {
            console.error('Failed to log performance:', error);
        }
    }
    static logUserAction(action, context) {
        try {
            const logData = {
                message: `User action: ${action}`,
                category: 'user',
                data: {
                    action,
                    timestamp: new Date().toISOString(),
                    ...context
                }
            };
            console.log('👤 User action:', logData);
        }
        catch (error) {
            console.error('Failed to log user action:', error);
        }
    }
    static logAuthEvent(event, userId, email) {
        try {
            const logData = {
                message: `Auth event: ${event}`,
                category: 'auth',
                data: {
                    event,
                    userId,
                    email,
                    timestamp: new Date().toISOString()
                }
            };
            console.log('🔐 Auth event:', logData);
        }
        catch (error) {
            console.error('Failed to log auth event:', error);
        }
    }
    static logDatabaseOperation(operation, table, success, context) {
        try {
            const logData = {
                message: `Database ${operation} on ${table}`,
                category: 'database',
                level: success ? 'info' : 'error',
                data: {
                    operation,
                    table,
                    success,
                    timestamp: new Date().toISOString(),
                    ...context
                }
            };
            if (success) {
                console.log('🗄️ Database operation:', logData);
            }
            else {
                console.error('🗄️ Database operation failed:', logData);
            }
        }
        catch (error) {
            console.error('Failed to log database operation:', error);
        }
    }
    static setUserContext(userId, email, additionalData) {
        try {
            console.log('👤 User context set:', { userId, email, ...additionalData });
        }
        catch (error) {
            console.error('Failed to set user context:', error);
        }
    }
    static clearUserContext() {
        try {
            console.log('👤 User context cleared');
        }
        catch (error) {
            console.error('Failed to clear user context:', error);
        }
    }
}
LoggingService.isInitialized = false;
export default LoggingService;
