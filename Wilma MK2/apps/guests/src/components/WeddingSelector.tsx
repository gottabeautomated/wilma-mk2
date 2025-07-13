import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useToast } from './ui/toast';
import { WeddingFormData, Wedding } from '../types/wedding';

export const WeddingSelector: React.FC = () => {
  const { user, userWeddings, currentWedding, selectWedding, createWedding } = useAuth();
  const navigate = useNavigate();
  const { success, error, ToastContainer } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<WeddingFormData>({
    wedding_date: '',
    venue_name: '',
    guest_count: 100,
    style: 'modern'
  });

  const handleCreateWedding = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newWedding = await createWedding(formData);
      setShowCreateForm(false);
      setFormData({
        wedding_date: '',
        venue_name: '',
        guest_count: 100,
        style: 'modern'
      });
      success(`Hochzeit "${newWedding.venue_name || 'Neue Hochzeit'}" wurde erfolgreich erstellt!`);
      // Nach der Erstellung zur Dashboard navigieren
      navigate('/');
    } catch (err) {
      console.error('Error creating wedding:', err);
      error('Fehler beim Erstellen der Hochzeit. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectWedding = async (weddingId: string) => {
    try {
      await selectWedding(weddingId);
      const selectedWedding = userWeddings.find(w => w.id === weddingId);
      success(`Hochzeit "${selectedWedding?.venue_name || 'Unbekannt'}" wurde ausgewählt!`);
      // Nach der Auswahl zur Dashboard navigieren
      navigate('/');
    } catch (err) {
      console.error('Error selecting wedding:', err);
      error('Fehler beim Auswählen der Hochzeit. Bitte versuchen Sie es erneut.');
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Datum nicht gesetzt';
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-champagne-50 to-royal-50 p-4">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-royal-900 mb-2">
            Wählen Sie Ihre Hochzeit
          </h1>
          <p className="text-royal-600">
            Willkommen zurück, {user?.email}!
          </p>
        </div>

        {/* Existing Weddings */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {userWeddings.map((wedding) => (
            <Card key={wedding.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-royal-900">
                    {wedding.venue_name || 'Neue Hochzeit'}
                  </h3>
                  {currentWedding?.id === wedding.id && (
                    <span className="px-2 py-1 bg-moss-100 text-moss-800 text-xs font-medium rounded-full">
                      Aktiv
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 text-sm text-royal-600">
                  <p>📅 {formatDate(wedding.wedding_date)}</p>
                  <p>👥 {wedding.guest_count} Gäste</p>
                  {wedding.venue_address && (
                    <p>📍 {wedding.venue_address}</p>
                  )}
                  {wedding.style && (
                    <p>🎨 {wedding.style}</p>
                  )}
                </div>

                <Button
                  onClick={() => handleSelectWedding(wedding.id)}
                  className={`w-full ${
                    currentWedding?.id === wedding.id
                      ? 'bg-moss-600 hover:bg-moss-700'
                      : 'bg-royal-600 hover:bg-royal-700'
                  } text-white`}
                >
                  {currentWedding?.id === wedding.id ? 'Ausgewählt' : 'Auswählen'}
                </Button>
              </div>
            </Card>
          ))}

          {/* Create New Wedding Card */}
          <Card className="p-6 border-2 border-dashed border-royal-200 hover:border-royal-300 transition-colors">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-royal-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">➕</span>
              </div>
              <h3 className="text-lg font-semibold text-royal-900">
                Neue Hochzeit hinzufügen
              </h3>
              <p className="text-sm text-royal-600">
                Erstellen Sie eine neue Hochzeit für das Gäste-Management
              </p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="w-full bg-champagne-600 hover:bg-champagne-700 text-white"
              >
                Hochzeit erstellen
              </Button>
            </div>
          </Card>
        </div>

        {/* Create Wedding Form */}
        {showCreateForm && (
          <Card className="p-8 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-royal-900">
                  Neue Hochzeit erstellen
                </h2>
                <p className="text-royal-600 mt-2">
                  Füllen Sie die grundlegenden Informationen aus
                </p>
              </div>

              <form onSubmit={handleCreateWedding} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-2">
                      Hochzeitsdatum
                    </label>
                    <input
                      type="date"
                      value={formData.wedding_date}
                      onChange={(e) => setFormData({...formData, wedding_date: e.target.value})}
                      className="w-full px-3 py-2 border border-royal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-2">
                      Anzahl Gäste
                    </label>
                    <input
                      type="number"
                      value={formData.guest_count}
                      onChange={(e) => setFormData({...formData, guest_count: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-royal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                </div>

                                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-2">
                      Hochzeitslocation
                    </label>
                    <input
                      type="text"
                      value={formData.venue_name || ''}
                      onChange={(e) => setFormData({...formData, venue_name: e.target.value})}
                      placeholder="z.B. Schloss Neuschwanstein"
                      className="w-full px-3 py-2 border border-royal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-2">
                      Hochzeitsstil
                    </label>
                    <select
                      value={formData.style || ''}
                      onChange={(e) => setFormData({...formData, style: e.target.value as Wedding['style']})}
                      className="w-full px-3 py-2 border border-royal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500"
                    >
                      <option value="modern">Modern</option>
                      <option value="rustic">Rustikal</option>
                      <option value="classic">Klassisch</option>
                      <option value="boho">Boho</option>
                      <option value="vintage">Vintage</option>
                      <option value="outdoor">Outdoor</option>
                      <option value="industrial">Industrial</option>
                    </select>
                  </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                  >
                    Abbrechen
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-royal-600 hover:bg-royal-700 text-white"
                  >
                    {loading ? 'Erstellen...' : 'Hochzeit erstellen'}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}; 