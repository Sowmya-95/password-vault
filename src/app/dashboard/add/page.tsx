import { Card } from "@/components/ui/card";
import CredentialForm from "@/components/custom/form"; // Make sure the path is right
import { Separator } from "@/components/ui/separator";

export default function AddPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">➕ Add New Credential</h1>
                <p className="text-sm text-muted-foreground">
                    Fill in the details below to securely store a new password entry.
                </p>
            </div>

            <Separator />

            <Card className="p-6 shadow-md bg-white animate-in fade-in duration-300">
                <CredentialForm />
            </Card>
        </div>
    );
}
