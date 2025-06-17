// Configuration Supabase et variables globales

// Configuration Supabase
const SUPABASE_URL = 'https://jyriyfakqbgpqtdxnzpz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cml5ZmFrcWJncHF0ZHhuenB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjQ5MTgsImV4cCI6MjA2NTc0MDkxOH0.daVcvdk2IbyCWNQsLrM2CvVBgJdkAcEWS7iNsa939W4';

// Initialiser Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Variables globales de l'application
let currentUser = null;
let currentTheme = null;
let themes = [];
let links = {};
let userFavorites = [];
let allLinks = [];
let showingFavoritesOnly = false;

// Variables globales pour les permissions
window.userRole = 'user';
window.userPermissions = {};

// Configuration de l'application
const APP_CONFIG = {
    // Mode démo (true = utilise les données locales, false = utilise Supabase)
    DEMO_MODE: false,
    
    // Identifiants de démo pour les tests
    DEMO_CREDENTIALS: {
        email: 'admin@samsic.fr',
        password: 'samsic2025'
    },
    
    // Configuration des notifications
    NOTIFICATIONS: {
        SUCCESS_DURATION: 3000,
        ERROR_DURATION: 5000,
        WARNING_DURATION: 4000
    },
    
    // Configuration de la recherche
    SEARCH: {
        MIN_CHARS: 2,
        DEBOUNCE_DELAY: 300
    },
    
    // Configuration des thèmes
    THEMES: {
        DEFAULT: 'light',
        STORAGE_KEY: 'samsic_theme'
    }
};

// Export des variables globales
window.supabase = supabase;
window.APP_CONFIG = APP_CONFIG;