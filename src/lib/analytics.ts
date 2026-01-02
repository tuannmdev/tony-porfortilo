// Simple analytics helper for tracking events
// Can be extended with Google Analytics, Plausible, etc.

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (typeof window === "undefined") return;

  // Console log in development
  if (process.env.NODE_ENV === "development") {
    console.log("📊 Analytics Event:", eventName, properties);
  }

  // Add your analytics provider here
  // Example: Google Analytics
  // if (window.gtag) {
  //   window.gtag('event', eventName, properties);
  // }

  // Example: Plausible
  // if (window.plausible) {
  //   window.plausible(eventName, { props: properties });
  // }
};

export const trackPageView = (url: string) => {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    console.log("📊 Page View:", url);
  }

  // Add your analytics provider here
};

// Common event tracking helpers
export const analytics = {
  // Project events
  viewProject: (projectSlug: string) => {
    trackEvent("view_project", { project_slug: projectSlug });
  },

  // Contact events
  submitContactForm: () => {
    trackEvent("submit_contact_form");
  },

  // Navigation events
  clickExternalLink: (url: string) => {
    trackEvent("click_external_link", { url });
  },

  // Download events
  downloadResume: () => {
    trackEvent("download_resume");
  },
};
