import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getQueryFn } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import type { Waitlist } from "@shared/schema";

// Simple spinner component for loading state
function Spinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  )
}

export default function AdminPage() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [adminSecret, setAdminSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Define a type for the waitlist response
  interface WaitlistResponse {
    message: string;
    totalEntries: number;
    data: Waitlist[];
  }

  // Fetch waitlist entries query
  const waitlistQuery = useQuery<WaitlistResponse>({
    queryKey: ["/api/admin/waitlist"],
    queryFn: getQueryFn<WaitlistResponse>({
      on401: "returnNull",
    }),
    enabled: isAuthenticated,
  });

  const handleLogin = async () => {
    if (!adminSecret.trim()) {
      toast({
        title: "Error",
        description: "Please enter the admin secret",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/admin/waitlist", {
        headers: {
          Authorization: `Bearer ${adminSecret}`,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        // Force refetch
        waitlistQuery.refetch();
        toast({
          title: "Success",
          description: "Successfully authenticated as admin",
        });
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid admin secret",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to authenticate",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminSecret("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const filteredEntries = waitlistQuery.data?.data.filter((entry: Waitlist) => 
    entry.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter the admin secret to access the waitlist dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Input
                id="adminSecret"
                type="password"
                placeholder="Admin Secret"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Waitlist Dashboard</h1>
          <a href="/" className="text-primary hover:underline text-sm">
            ← Back to Website
          </a>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Waitlist Statistics</CardTitle>
          <CardDescription>Overview of your waitlist signups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-primary">Total Signups</h3>
              <p className="text-3xl font-bold">
                {waitlistQuery.isLoading ? (
                  <span className="text-sm">Loading...</span>
                ) : (
                  waitlistQuery.data?.totalEntries || 0
                )}
              </p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-primary">Recent Signups (24h)</h3>
              <p className="text-3xl font-bold">
                {waitlistQuery.isLoading ? (
                  <span className="text-sm">Loading...</span>
                ) : (
                  waitlistQuery.data?.data?.filter((entry: Waitlist) => {
                    const date = new Date(entry.createdAt);
                    const now = new Date();
                    const yesterday = new Date(now);
                    yesterday.setDate(yesterday.getDate() - 1);
                    return date >= yesterday;
                  }).length || 0
                )}
              </p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-primary">Marketing Consent</h3>
              <p className="text-3xl font-bold">
                {waitlistQuery.isLoading ? (
                  <span className="text-sm">Loading...</span>
                ) : (
                  waitlistQuery.data?.data?.filter((entry: Waitlist) => 
                    entry.receiveUpdates
                  ).length || 0
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Waitlist Entries</CardTitle>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <CardDescription>
              Browse all the emails that have signed up for the waitlist
            </CardDescription>
            <Input
              placeholder="Search by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          {waitlistQuery.isLoading ? (
            <Spinner />
          ) : waitlistQuery.error ? (
            <div className="p-4 text-center text-red-500">
              Error loading waitlist data
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Signup Date</TableHead>
                    <TableHead className="text-center">Marketing Consent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries?.length ? (
                    filteredEntries.map((entry: Waitlist) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.id}</TableCell>
                        <TableCell>{entry.email}</TableCell>
                        <TableCell>{formatDate(entry.createdAt)}</TableCell>
                        <TableCell className="text-center">
                          {entry.receiveUpdates ? (
                            <span className="text-green-500">Yes</span>
                          ) : (
                            <span className="text-gray-500">No</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        {searchQuery ? "No matching results" : "No entries yet"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}