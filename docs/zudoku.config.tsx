import type { ZudokuConfig } from "zudoku";
import AppsPage from "./src/AppsPage";
import CreateAppPage from "./src/CreateAppPage";
import { AppWindowIcon } from "lucide-react";

const config: ZudokuConfig = {
  site: {
    title: "",
    logo: {
      src: {
        light:
          "https://upload.wikimedia.org/wikipedia/en/5/53/Squarespace_Logo.svg",
        dark: "https://upload.wikimedia.org/wikipedia/en/5/53/Squarespace_Logo.svg",
      },
      width: "200px",
    },
  },
  theme: {
    light: {
      radius: "0",
    },
    dark: {
      radius: "0",
    },
  },
  metadata: {
    title: "Developer Portal",
    description: "Developer Portal",
  },
  navigation: [
    {
      type: "category",
      label: "Documentation",
      items: [
        {
          type: "category",
          label: "Getting Started",
          icon: "sparkles",
          items: [
            {
              type: "doc",
              file: "introduction",
            },
            {
              type: "doc",
              file: "markdown",
            },
          ],
        },
        {
          type: "category",
          label: "Useful Links",
          collapsible: false,
          icon: "link",
          items: [
            {
              type: "link",
              label: "Zuplo Docs",
              to: "https://zuplo.com/docs/dev-portal/introduction",
            },
            {
              type: "link",
              label: "Developer Portal Docs",
              to: "https://zuplo.com/docs/dev-portal/introduction",
            },
          ],
        },
      ],
    },
    {
      type: "link",
      to: "/api",
      label: "API Reference",
    },
    {
      type: "custom-page",
      display: "auth",
      label: "My Apps",
      path: "/apps",
      element: <AppsPage />,
    },
    {
      type: "custom-page",
      display: "hide",
      label: "Create App",
      path: "/apps/create",
      element: <CreateAppPage />,
    },
  ],
  redirects: [{ from: "/", to: "/api" }],
  apis: [
    {
      type: "file",
      input: "../config/routes.oas.json",
      path: "api",
    },
  ],
  authentication: {
    // IMPORTANT: This is a demo Auth0 configuration.
    // In a real application, you should replace these values with your own
    // identity provider's configuration.
    // This configuration WILL NOT WORK with custom domains.
    // For more information, see:
    // https://zuplo.com/docs/dev-portal/zudoku/configuration/authentication
    type: "auth0",
    domain: "auth.zuplo.site",
    clientId: "f8I87rdsCRo4nU2FHf0fHVwA9P7xi7Ml",
    audience: "https://api.example.com/",
  },
  plugins: [
    {
      getProfileMenuItems: () => {
        return [
          {
            label: "My Apps",
            path: "/apps",
            category: "middle",
            icon: AppWindowIcon,
          },
        ];
      },
    },
  ],
};

export default config;
