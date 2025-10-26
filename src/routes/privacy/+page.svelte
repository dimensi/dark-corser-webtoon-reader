<script lang="ts">
  // Privacy Policy page
</script>

<svelte:head>
  <title>Privacy Policy - Dark Score Webtoon Reader</title>
  <meta name="description" content="Privacy Policy for Dark Score Webtoon Reader - how we handle your data and Google Drive access" />
</svelte:head>

<main class="privacy-page">
  <div class="container">
    <h1>Privacy Policy</h1>
    <p class="last-updated">Last updated: 26.10.2025 17:00</p>

    <section>
      <h2>1. Information We Collect</h2>
      <p>Dark Score Webtoon Reader is designed to help you read webtoon archives from Google Drive. We collect minimal information:</p>
      <ul>
        <li><strong>Google Drive Access Token</strong>: We request read-only access to your Google Drive files to display webtoon images</li>
        <li><strong>Usage Data</strong>: We may collect anonymous usage statistics to improve the application</li>
        <li><strong>No Personal Data</strong>: We do not collect, store, or process any personal information beyond what's necessary for the app to function</li>
      </ul>
    </section>

    <section>
      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information solely for:</p>
      <ul>
        <li>Accessing and displaying webtoon images from your Google Drive</li>
        <li>Providing the core functionality of the webtoon reader</li>
        <li>Improving application performance and user experience</li>
      </ul>
    </section>

    <section>
      <h2>3. Google Drive Integration</h2>
      <p>When you authorize our application:</p>
      <ul>
        <li>We request <strong>read-only access</strong> to your Google Drive files</li>
        <li>We only access files that you explicitly choose to view</li>
        <li>We do not modify, delete, or share your files</li>
        <li>We do not store your files on our servers</li>
        <li>Access tokens are stored locally in your browser and can be revoked at any time</li>
      </ul>
    </section>

    <section>
      <h2>4. Data Storage and Security</h2>
      <p>We implement the following security measures:</p>
      <ul>
        <li>Access tokens are stored locally in your browser's localStorage</li>
        <li>No data is transmitted to our servers except for the necessary API calls to Google Drive</li>
        <li>All communication with Google APIs is encrypted using HTTPS</li>
        <li>You can revoke access at any time through your Google Account settings</li>
      </ul>
    </section>

    <section>
      <h2>5. Third-Party Services</h2>
      <p>We use the following third-party services:</p>
      <ul>
        <li><strong>Google Drive API</strong>: For accessing your webtoon files</li>
        <li><strong>Vercel</strong>: For hosting the application</li>
        <li><strong>Google Identity Services</strong>: For secure authentication</li>
      </ul>
      <p>These services have their own privacy policies, which we recommend you review.</p>
    </section>

    <section>
      <h2>6. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Revoke access to your Google Drive at any time</li>
        <li>Clear your browser's localStorage to remove stored tokens</li>
        <li>Contact us with any privacy concerns</li>
      </ul>
    </section>

    <section>
      <h2>7. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
    </section>

    <section>
      <h2>8. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us through the application or at our support email.</p>
    </section>
  </div>
</main>

<style>
  .privacy-page {
    min-height: 100vh;
    padding: 2rem 1rem;
    background: #111;
    color: #eee;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #5d8cff;
  }

  .last-updated {
    color: #999;
    font-style: italic;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem 0;
    color: #eee;
    border-bottom: 1px solid #333;
    padding-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    color: #5d8cff;
  }

  @media (max-width: 600px) {
    .privacy-page {
      padding: 1rem 0.5rem;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.25rem;
    }
  }
</style>
