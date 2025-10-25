"use client";
import useSWR from "swr";
import { getJSON } from "./api";
import { HomeSummarySchema, type HomeSummary, ContactsSchema, type ContactsPayload } from "@/schemas/api";

export function useHomeSummary() {
  return useSWR<HomeSummary, Error, string>(
    "/api/home-summary", 
    (url: string) => getJSON(url, HomeSummarySchema));
}

export function useContacts() {
  return useSWR<ContactsPayload, Error, string>(
    "/api/contact",
    (url: string) => getJSON(url, ContactsSchema)
  );
}

