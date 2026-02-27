// File: src/context/ContactProvider.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Contact, Note } from "@/types";
import { contact as initialContact } from "@/data/dummyData";
import { useAuth } from "./AuthContext";

interface ContactContextType {
  contacts: Contact[];
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact | null) => void;
  addNote: (contactId: string, content: string) => void;
  editNote: (noteId: string, content: string) => void;
  deleteNote: (noteId: string) => void;
  addLabel: (contactId: string, label: string) => void;
  removeLabel: (contactId: string, label: string) => void;
  updateContact: (contactId: string, updates: Partial<Contact>) => void;
  searchContacts: (query: string) => Contact[];
  filterByLabel: (label: string) => Contact[];
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([initialContact]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    initialContact,
  );

  const addNote = (contactId: string, content: string) => {
    if (!user || !content.trim()) return;

    const newNote: Note = {
      id: `note-${Date.now()}`,
      userId: contactId,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar,
      },
    };

    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? { ...contact, notes: [newNote, ...contact.notes] }
          : contact,
      ),
    );

    if (selectedContact?.id === contactId) {
      setSelectedContact((prev) =>
        prev ? { ...prev, notes: [newNote, ...prev.notes] } : null,
      );
    }
  };

  const editNote = (noteId: string, content: string) => {
    setContacts((prev) =>
      prev.map((contact) => ({
        ...contact,
        notes: contact.notes.map((note) =>
          note.id === noteId
            ? { ...note, content, updatedAt: new Date().toISOString() }
            : note,
        ),
      })),
    );
  };

  const deleteNote = (noteId: string) => {
    setContacts((prev) =>
      prev.map((contact) => ({
        ...contact,
        notes: contact.notes.filter((note) => note.id !== noteId),
      })),
    );
  };

  const addLabel = (contactId: string, label: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? { ...contact, labels: [...contact.labels, label] }
          : contact,
      ),
    );
  };

  const removeLabel = (contactId: string, label: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? { ...contact, labels: contact.labels.filter((l) => l !== label) }
          : contact,
      ),
    );
  };

  const updateContact = (contactId: string, updates: Partial<Contact>) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId ? { ...contact, ...updates } : contact,
      ),
    );

    if (selectedContact?.id === contactId) {
      setSelectedContact((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const searchContacts = (query: string): Contact[] => {
    if (!query) return contacts;

    return contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(query.toLowerCase()) ||
        contact.email.toLowerCase().includes(query.toLowerCase()) ||
        contact.phone.includes(query),
    );
  };

  const filterByLabel = (label: string): Contact[] => {
    return contacts.filter((contact) => contact.labels.includes(label));
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        selectedContact,
        setSelectedContact,
        addNote,
        editNote,
        deleteNote,
        addLabel,
        removeLabel,
        updateContact,
        searchContacts,
        filterByLabel,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
};
