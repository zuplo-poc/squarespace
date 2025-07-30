import { Button } from "zudoku/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "zudoku/ui/Card";
import { Link } from "zudoku/router";
import { Badge } from "zudoku/ui/Badge";
import AppsPageTitle from "./AppsPageTitle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "zudoku/ui/Tooltip";

type OAuthApp = {
  name: string;
  description: string;
  redirectUris: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  appType: "public" | "confidential";
  status: "active" | "pending" | "rejected";
};

const apps = [
  {
    name: "My Squarespace App",
    description: "A description of my Squarespace app",
    redirectUris:
      "https://yourapp.com/auth/callback\nhttps://localhost:3000/auth/callback",
    clientId: "123",
    clientSecret: "123",
    scopes: ["read:profile", "write:profile"],
    appType: "public",
    status: "active",
  },
  {
    name: "My Squarespace App",
    description: "A description of my Squarespace app",
    redirectUris:
      "https://yourapp.com/auth/callback\nhttps://localhost:3000/auth/callback",
    clientId: "123",
    clientSecret: "123",
    scopes: ["read:profile", "write:profile"],
    appType: "public",
    status: "pending",
  },
] satisfies OAuthApp[];

const AppsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <AppsPageTitle />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Applications</h2>
        <Button asChild>
          <Link to="/apps/create">Create App</Link>
        </Button>
      </div>

      <TooltipProvider>
        {apps.length > 0 &&
          apps.map((app, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <div>
                    {app.name}
                    <Badge className="ml-2">{app.appType}</Badge>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        className="ml-2 self-end"
                        variant={
                          app.status === "active" ? "outline" : "secondary"
                        }
                      >
                        {app.status === "active"
                          ? "Active"
                          : app.status === "pending"
                          ? "Pending Approval"
                          : "Rejected"}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      {app.status === "active"
                        ? "Your app is active and ready to use."
                        : app.status === "pending"
                        ? "Your app has been submitted for approval."
                        : "Your app has been rejected."}
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
                <CardDescription>
                  {app.description && app.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[max-content_1fr] gap-2 text-sm">
                  <strong>Client ID:</strong> <Secret>{app.clientId}</Secret>
                  <strong>Client Secret:</strong>{" "}
                  <Secret>{app.clientSecret}</Secret>
                  <strong>Scopes:</strong> {app.scopes.join(", ")}
                  <strong>Redirect URIs:</strong>{" "}
                  {app.redirectUris.split("\n").join(", ")}
                </div>
              </CardContent>
            </Card>
          ))}
      </TooltipProvider>
    </div>
  );
};

const Secret = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-sm font-mono border px-2 py-1 rounded-md text-muted-foreground">
      {children}
    </div>
  );
};

export default AppsPage;
