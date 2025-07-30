import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "zudoku/ui/Input";
import { Label } from "zudoku/ui/Label";
import { Button } from "zudoku/ui/Button";
import { Textarea } from "zudoku/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "zudoku/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "zudoku/ui/Card";
import AppsPageTitle from "./AppsPageTitle";

type OAuthApp = {
  name: string;
  description: string;
  redirectUris: string;
  scopes: string[];
  appType: "public" | "confidential";
};

const apps = [
  {
    name: "My Squarespace App",
    description: "A description of my Squarespace app",
    redirectUris:
      "https://yourapp.com/auth/callback\nhttps://localhost:3000/auth/callback",
    scopes: ["read:profile", "write:profile"],
    appType: "public",
  },
];

const AppsPage = () => {
  const availableScopes = [
    "read:profile",
    "write:profile",
    "read:commerce",
    "write:commerce",
    "read:website",
    "write:website",
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OAuthApp>({
    defaultValues: {
      name: "",
      description: "",
      redirectUris: "",
      scopes: [],
      appType: "public",
    },
  });

  const handleScopeToggle = (scope: string, currentScopes: string[]) => {
    return currentScopes.includes(scope)
      ? currentScopes.filter((s) => s !== scope)
      : [...currentScopes, scope];
  };

  const onSubmit = async (data: OAuthApp) => {
    try {
      // An async call to your API to create the app
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      reset();

      alert("OAuth app created successfully!");
    } catch (error) {
      alert("Failed to create OAuth app. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <AppsPageTitle />
      <Card>
        <CardHeader>
          <CardTitle>Create New OAuth App</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Application Name *</Label>
                <Input
                  id="name"
                  placeholder="My Squarespace App"
                  {...register("name", {
                    required: "Application name is required",
                    minLength: {
                      value: 3,
                      message: "Application name must be at least 3 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="appType">Application Type *</Label>
                <Controller
                  name="appType"
                  control={control}
                  rules={{ required: "Application type is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select app type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          Public (Client-side apps)
                        </SelectItem>
                        <SelectItem value="confidential">
                          Confidential (Server-side apps)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.appType && (
                  <p className="text-sm text-red-600">
                    {errors.appType.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what your application does..."
                rows={3}
                {...register("description")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="redirectUris">Redirect URIs *</Label>
              <Textarea
                id="redirectUris"
                placeholder="https://yourapp.com/auth/callback&#10;https://localhost:3000/auth/callback"
                rows={3}
                {...register("redirectUris", {
                  required: "At least one redirect URI is required",
                  validate: (value) => {
                    const uris = value.split("\n").filter((uri) => uri.trim());
                    if (uris.length === 0) {
                      return "At least one redirect URI is required";
                    }
                    for (const uri of uris) {
                      try {
                        new URL(uri.trim());
                      } catch {
                        return `Invalid URL: ${uri.trim()}`;
                      }
                    }
                    return true;
                  },
                })}
              />
              {errors.redirectUris && (
                <p className="text-sm text-red-600">
                  {errors.redirectUris.message}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Enter one redirect URI per line. These are the URLs where users
                will be redirected after authorization.
              </p>
            </div>

            <div className="space-y-3">
              <Label>Scopes *</Label>
              <Controller
                name="scopes"
                control={control}
                rules={{
                  required: "At least one scope is required",
                  validate: (value) =>
                    value.length > 0 || "At least one scope is required",
                }}
                render={({ field }) => (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableScopes.map((scope) => (
                      <label
                        key={scope}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={field.value.includes(scope)}
                          onChange={() => {
                            field.onChange(
                              handleScopeToggle(scope, field.value)
                            );
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{scope}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
              {errors.scopes && (
                <p className="text-sm text-red-600">{errors.scopes.message}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Select the permissions your app needs to access Squarespace
                APIs.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? "Creating..." : "Create OAuth App"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppsPage;
