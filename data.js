// Données initiales SAMSIC avec tous les liens Google Drive

const INITIAL_DATA = {
    themes: [
        {
            id: 'rh',
            emoji: '👥',
            title: 'Ressources Humaines',
            description: 'Gestion du personnel et documents RH'
        },
        {
            id: 'materiel',
            emoji: '🛠️',
            title: 'Matériel',
            description: 'Équipements et inventaire'
        },
        {
            id: 'mase',
            emoji: '🛡️',
            title: 'MASE',
            description: 'Sécurité et prévention'
        },
        {
            id: 'finances',
            emoji: '💰',
            title: 'Finances',
            description: 'Comptabilité et gestion financière'
        },
        {
            id: 'formations',
            emoji: '📚',
            title: 'Formations',
            description: 'Programmes de formation'
        }
    ],
    
    links: {
        'rh': [
            {
                id: 'rh_1',
                emoji: '📊',
                title: 'Tableau de suivi',
                url: 'https://drive.google.com/drive/folders/1M6kKL7unmuu0Uq1WHUZBWxdsMkfQkj3O',
                type: 'dossier'
            },
            {
                id: 'rh_2',
                emoji: '⚖️',
                title: 'Disciplinaire',
                url: 'https://drive.google.com/drive/folders/1KJIg1gG6JjcjKjDQJIF03kT_5RWJJpi_',
                type: 'dossier'
            },
            {
                id: 'rh_3',
                emoji: '🔍',
                title: 'Analyse AT',
                url: 'https://drive.google.com/drive/folders/1iG3JS1xylfqwPp8yLzyW_gLSb5nG2O0C',
                type: 'dossier'
            },
            {
                id: 'rh_4',
                emoji: '📋',
                title: 'Extraction hebdomadaire',
                url: 'https://docs.google.com/spreadsheets/d/1DVKv3LWtwg79BNcY755vZMzWyGtdhY5DOjpEWNhQfr4',
                type: 'document'
            }
        ],
        
        'materiel': [
            {
                id: 'materiel_1',
                emoji: '📦',
                title: 'Dossier générique',
                url: 'https://drive.google.com/drive/folders/1BKAFAKSZL2MGfe9HlJEkRUovm85voruf',
                type: 'dossier'
            }
        ],
        
        'mase': [
            {
                id: 'mase_1',
                emoji: '📈',
                title: 'Suivi 2024',
                url: 'https://drive.google.com/drive/folders/1gYSB-3IIqSkVv6YgW6QHQ6-ydV5LLAQ8',
                type: 'dossier'
            },
            {
                id: 'mase_2',
                emoji: '📊',
                title: 'Suivi 2025',
                url: 'https://drive.google.com/drive/folders/1xts_xuGBmTr8Bjd-ukqzm6AVC3wqc0L1',
                type: 'dossier'
            },
            {
                id: 'mase_3',
                emoji: '📋',
                title: 'Plans de préventions',
                url: 'https://drive.google.com/drive/folders/10-FBIaX_NLb3zaeL99CmK9P8TI71jDci',
                type: 'dossier'
            },
            {
                id: 'mase_4',
                emoji: '💬',
                title: 'Causeries sécurité 2025',
                url: 'https://drive.google.com/drive/folders/1eW8KlDGYgNk0sZ-S99sswmMOWoK25RMg',
                type: 'dossier'
            }
        ],
        
        'finances': [
            {
                id: 'finances_1',
                emoji: '👨‍🎓',
                title: 'Suivi absences alternants',
                url: 'https://docs.google.com/spreadsheets/d/1phwu8F_8MP9istavG-ABKiyok9hwFGv597EPl9CvD60',
                type: 'fichier'
            },
            {
                id: 'finances_2',
                emoji: '➕',
                title: 'Suivi prestations supplémentaires',
                url: 'https://docs.google.com/spreadsheets/d/1_J_z9yi73DIAu2qlEZ4Q9cIQ3vEN2e5ObSjNcWW-7xc',
                type: 'fichier'
            },
            {
                id: 'finances_3',
                emoji: '🏫',
                title: 'Suivi UCBL',
                url: 'https://docs.google.com/spreadsheets/d/1VuOTbE5jIrKXxKMIW8uuqe53ZSWhmuhOQEQFra2OEhg',
                type: 'fichier'
            }
        ],
        
        'formations': [
            {
                id: 'formations_1',
                emoji: '📚',
                title: 'Dossier générique',
                url: 'https://drive.google.com/drive/folders/1skwXN-VxzjaGjf9QtkceJrBqenpd6CjE',
                type: 'dossier'
            }
        ]
    }
};

// Fonction pour charger les données initiales dans Supabase
async function loadInitialDataToSupabase() {
    try {
        console.log('Chargement des données initiales dans Supabase...');
        
        // Charger les thèmes
        for (const theme of INITIAL_DATA.themes) {
            const { error: themeError } = await supabase
                .from('themes')
                .upsert(theme, { onConflict: 'id' });
            
            if (themeError) {
                console.error(`Erreur lors du chargement du thème ${theme.id}:`, themeError);
            } else {
                console.log(`Thème ${theme.id} chargé avec succès`);
            }
        }
        
        // Charger les liens
        for (const [themeId, links] of Object.entries(INITIAL_DATA.links)) {
            for (const link of links) {
                const linkData = {
                    ...link,
                    theme_id: themeId
                };
                
                const { error: linkError } = await supabase
                    .from('links')
                    .upsert(linkData, { onConflict: 'id' });
                
                if (linkError) {
                    console.error(`Erreur lors du chargement du lien ${link.id}:`, linkError);
                } else {
                    console.log(`Lien ${link.id} chargé avec succès`);
                }
            }
        }
        
        console.log('Toutes les données initiales ont été chargées avec succès !');
        return true;
        
    } catch (error) {
        console.error('Erreur lors du chargement des données initiales:', error);
        return false;
    }
}

// Export pour utilisation dans d'autres modules
window.INITIAL_DATA = INITIAL_DATA;
window.loadInitialDataToSupabase = loadInitialDataToSupabase;