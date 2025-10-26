<script lang="ts">
  // Terms of Service page
</script>

<svelte:head>
  <title>Terms of Service - Dark Score Webtoon Reader</title>
  <meta name="description" content="Terms of Service for Dark Score Webtoon Reader - conditions for using our webtoon reading application" />
</svelte:head>

<main class="terms-page">
  <div class="container">
    <h1>Terms of Service</h1>
    <p class="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

    <section>
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using Dark Score Webtoon Reader ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
    </section>

    <section>
      <h2>2. Description of Service</h2>
      <p>Dark Score Webtoon Reader is a web application that allows users to read webtoon archives stored in Google Drive. The service provides:</p>
      <ul>
        <li>Access to webtoon images from Google Drive</li>
        <li>Archive extraction and image display functionality</li>
        <li>Read-only access to user's Google Drive files</li>
      </ul>
    </section>

    <section>
      <h2>3. User Responsibilities</h2>
      <p>As a user of this service, you agree to:</p>
      <ul>
        <li>Use the service only for lawful purposes</li>
        <li>Respect copyright and intellectual property rights</li>
        <li>Not attempt to access files you do not have permission to view</li>
        <li>Not use the service to distribute illegal or harmful content</li>
        <li>Maintain the security of your Google account credentials</li>
      </ul>
    </section>

    <section>
      <h2>4. Google Drive Integration</h2>
      <p>This service integrates with Google Drive and requires:</p>
      <ul>
        <li>Read-only access to your Google Drive files</li>
        <li>Authorization through Google's OAuth system</li>
        <li>Compliance with Google's Terms of Service</li>
      </ul>
      <p>You can revoke access at any time through your Google Account settings.</p>
    </section>

    <section>
      <h2>5. Intellectual Property</h2>
      <p>This service is provided for reading webtoons and other comic content. Users are responsible for ensuring they have the right to access and view the content they choose to read through this service.</p>
    </section>

    <section>
      <h2>6. Privacy and Data Protection</h2>
      <p>Your privacy is important to us. Please review our <a href="/privacy">Privacy Policy</a> to understand how we collect, use, and protect your information.</p>
    </section>

    <section>
      <h2>7. Service Availability</h2>
      <p>We strive to provide reliable service, but we cannot guarantee:</p>
      <ul>
        <li>Uninterrupted access to the service</li>
        <li>Compatibility with all file formats</li>
        <li>Access to all Google Drive files</li>
      </ul>
    </section>

    <section>
      <h2>8. Limitation of Liability</h2>
      <p>In no event shall Dark Score Webtoon Reader be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.</p>
    </section>

    <section>
      <h2>9. Termination</h2>
      <p>We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
    </section>

    <section>
      <h2>10. Changes to Terms</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
    </section>

    <section>
      <h2>11. Contact Information</h2>
      <p>If you have any questions about these Terms of Service, please contact us through the application or at our support email.</p>
    </section>
  </div>
</main>

<style>
  .terms-page {
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

  a {
    color: #5d8cff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    .terms-page {
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
