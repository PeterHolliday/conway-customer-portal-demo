"use client";
import PageHeader from "@/components/site/PageHeader";
import RibbonLabel from "@/components/contacts/RibbonLabel";
import AccountManager from "@/components/contacts/AccountManager";
import Departments from "@/components/contacts/Departments";
import { useContacts } from "@/services/hooks";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactsPage() {
  const { data, error, isLoading } = useContacts();

  return (
    <>
      <PageHeader title="Contacts" />

      <section className="bg-white py-8">
        <div className="mx-auto max-w-6xl px-4">
          <RibbonLabel>Your FM Conway Sales Contact</RibbonLabel>
          {isLoading ? (
            <div className="mt-6"><Skeleton className="h-24 w-full" /></div>
          ) : error ? (
            <div className="mt-6 text-red-600">Failed to load contact.</div>
          ) : (
            <AccountManager
              name={data!.accountManager.name}
              phone={data!.accountManager.phone}
              email={data!.accountManager.email}
            />
          )}
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-6xl px-4">
          <RibbonLabel>FM Conway Contact List</RibbonLabel>
          <div className="mt-6">
            {isLoading ? (
              <Skeleton className="h-40 w-full" />
            ) : error ? (
              <div className="text-red-600">Failed to load departments.</div>
            ) : (
              <Departments items={data!.departments} />  
            )}
          </div>
        </div>
      </section>
    </>
  );
}
