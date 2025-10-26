<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { googleAuthService, type AuthState } from '$lib/services/googleAuth';

  let authState: AuthState = $state({
    isAuthenticated: false,
    accessToken: null,
    isLoading: false
  });

  let unsubscribe: (() => void) | null = null;

  onMount(() => {
    // Подписываемся на изменения состояния авторизации
    unsubscribe = googleAuthService.subscribe((state) => {
      authState = state;
    });

    // Получаем текущее состояние
    authState = googleAuthService.getAuthState();
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  async function handleSignIn() {
    try {
      await googleAuthService.signIn();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  }

  function handleSignOut() {
    googleAuthService.signOut();
  }
</script>

<div class="auth-container">
  {#if authState.isLoading}
    <button class="auth-button loading" disabled>
      <span class="spinner"></span>
      Авторизация...
    </button>
  {:else if authState.isAuthenticated}
    <div class="auth-info">
      <span class="status">✓ Авторизован</span>
      <button class="auth-button sign-out" onclick={handleSignOut}>
        Выйти
      </button>
    </div>
  {:else}
    <button class="auth-button sign-in" onclick={handleSignIn}>
      <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Войти через Google
    </button>
  {/if}
</div>

<style>
  .auth-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .auth-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #2f2f2f;
    color: #eee;
    border: 1px solid #404040;
  }

  .auth-button:hover:not(:disabled) {
    background: #404040;
    border-color: #555;
  }

  .auth-button.sign-in {
    background: #4285f4;
    border-color: #4285f4;
    color: white;
  }

  .auth-button.sign-in:hover {
    background: #3367d6;
    border-color: #3367d6;
  }

  .auth-button.sign-out {
    background: #dc3545;
    border-color: #dc3545;
    color: white;
  }

  .auth-button.sign-out:hover {
    background: #c82333;
    border-color: #c82333;
  }

  .auth-button.loading {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .google-icon {
    flex-shrink: 0;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .auth-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .status {
    font-size: 0.85rem;
    color: #93e29f;
    font-weight: 500;
  }

  @media (max-width: 600px) {
    .auth-container {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }

    .auth-info {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }

    .auth-button {
      justify-content: center;
    }
  }
</style>
