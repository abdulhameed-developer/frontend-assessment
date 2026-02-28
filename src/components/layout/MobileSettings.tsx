// File: src/components/layout/MobileSettings.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React, { useState } from "react";

interface MobileSettingsProps {
  onClose: () => void;
}

// FAQ Data
const faqData = [
  {
    question: "How do I start a new chat?",
    answer:
      "Tap the 'New' button at the bottom navigation and search for users or add a new contact.",
  },
  {
    question: "Can I edit my profile information?",
    answer:
      "Yes, go to Settings > Profile and tap 'Edit Profile' to update your information.",
  },
  {
    question: "How do I block a user?",
    answer:
      "Go to Settings > Privacy > Blocked Users and tap 'Block User' to block someone.",
  },
  {
    question: "What are read receipts?",
    answer:
      "Read receipts show when your message has been read. You can disable this in Privacy settings.",
  },
  {
    question: "How do I change notification settings?",
    answer:
      "Go to Settings > Notifications to customize your notification preferences.",
  },
];

// Support Tickets
const supportTickets = [
  { id: 1, issue: "Login Problem", status: "Resolved", date: "2024-01-15" },
  {
    id: 2,
    issue: "Message Delivery Delay",
    status: "In Progress",
    date: "2024-01-20",
  },
  {
    id: 3,
    issue: "Profile Picture Update",
    status: "Pending",
    date: "2024-01-25",
  },
];

// Define types for user objects
interface UserToBlock {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface BlockedUser extends UserToBlock {
  blockedReason?: string;
  blockedAt?: string;
}

// FIXED: Moved components outside of render function
// Standard toggle switch component
const ToggleSwitch = ({
  enabled,
  onChange,
  label,
  description,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex-1 pr-4">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      {description && (
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      )}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? "bg-blue-600" : "bg-gray-200"
      }`}
      aria-label={`Toggle ${label}`}
      aria-pressed={enabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
        aria-hidden="true"
      />
    </button>
  </div>
);

// Standard button component
const SettingsButton = ({
  onClick,
  children,
  className = "",
  showArrow = true,
  ariaLabel,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  ariaLabel?: string;
}) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${className}`}
    aria-label={ariaLabel}
  >
    <div className="flex items-center justify-between">
      <div>{children}</div>
      {showArrow && (
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </div>
  </button>
);

// Terms of Service Content - Moved outside
const TermsContent = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
    <div className="sticky top-0 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <button
        onClick={onClose}
        className="p-2 -ml-2 rounded-lg hover:bg-gray-100"
        aria-label="Close terms of service"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className="text-lg font-semibold">Terms of Service</h2>
      <div className="w-10" />
    </div>
    <div className="p-6 space-y-4">
      <h3 className="text-xl font-bold">BOXpad Terms of Service</h3>
      <p className="text-sm text-gray-600">Last updated: February 28, 2026</p>

      <div className="space-y-4">
        <div>
          <h4 className="mb-2 font-semibold">1. Acceptance of Terms</h4>
          <p className="text-sm text-gray-600">
            By accessing and using BOXpad, you agree to be bound by these Terms
            of Service and all applicable laws and regulations. If you do not
            agree with any of these terms, you are prohibited from using or
            accessing this site.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">2. Use License</h4>
          <p className="text-sm text-gray-600">
            Permission is granted to temporarily use BOXpad for personal,
            non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title, and under this license you may
            not:
          </p>
          <ul className="mt-2 ml-6 text-sm text-gray-600 list-disc">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or other proprietary notations</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">3. Privacy and Data Protection</h4>
          <p className="text-sm text-gray-600">
            Your privacy is important to us. Our Privacy Policy explains how we
            collect, use, and protect your personal information. By using
            BOXpad, you consent to our data practices as described in the
            Privacy Policy.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">4. User Content</h4>
          <p className="text-sm text-gray-600">
            You retain all rights to any content you submit, post, or display on
            or through BOXpad. By submitting content, you grant us a worldwide,
            non-exclusive, royalty-free license to use, reproduce, and display
            such content solely for the purpose of providing and improving our
            services.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">5. Prohibited Conduct</h4>
          <p className="text-sm text-gray-600">You agree not to:</p>
          <ul className="mt-2 ml-6 text-sm text-gray-600 list-disc">
            <li>Harass, abuse, or harm another person</li>
            <li>Impersonate any person or entity</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Send spam or unsolicited messages</li>
            <li>Interfere with the proper functioning of BOXpad</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">6. Termination</h4>
          <p className="text-sm text-gray-600">
            We may terminate or suspend your access to BOXpad immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">7. Limitation of Liability</h4>
          <p className="text-sm text-gray-600">
            In no event shall BOXpad be liable for any damages (including,
            without limitation, damages for loss of data or profit, or due to
            business interruption) arising out of the use or inability to use
            the materials on BOXpad.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">8. Contact Information</h4>
          <p className="text-sm text-gray-600">
            If you have any questions about these Terms, please contact us
            through our support channels or reach out on social media.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Privacy Policy Content - Moved outside
const PrivacyContent = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
    <div className="sticky top-0 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <button
        onClick={onClose}
        className="p-2 -ml-2 rounded-lg hover:bg-gray-100"
        aria-label="Close privacy policy"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className="text-lg font-semibold">Privacy Policy</h2>
      <div className="w-10" />
    </div>
    <div className="p-6 space-y-4">
      <h3 className="text-xl font-bold">BOXpad Privacy Policy</h3>
      <p className="text-sm text-gray-600">Last updated: February 28, 2026</p>

      <div className="space-y-4">
        <div>
          <h4 className="mb-2 font-semibold">1. Information We Collect</h4>
          <p className="text-sm text-gray-600">
            We collect information you provide directly to us, such as when you
            create an account, update your profile, use our services, or
            communicate with us. This information may include:
          </p>
          <ul className="mt-2 ml-6 text-sm text-gray-600 list-disc">
            <li>Name and contact information</li>
            <li>Profile information and avatar</li>
            <li>Messages and communications</li>
            <li>Usage data and preferences</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">2. How We Use Your Information</h4>
          <p className="text-sm text-gray-600">
            We use the information we collect to:
          </p>
          <ul className="mt-2 ml-6 text-sm text-gray-600 list-disc">
            <li>Provide, maintain, and improve our services</li>
            <li>Communicate with you about updates and support</li>
            <li>Monitor and analyze usage patterns</li>
            <li>Protect against fraud and abuse</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">3. Sharing of Information</h4>
          <p className="text-sm text-gray-600">
            We do not sell, trade, or rent your personal information to third
            parties. We may share information in the following circumstances:
          </p>
          <ul className="mt-2 ml-6 text-sm text-gray-600 list-disc">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>In connection with a business transfer</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">4. Data Security</h4>
          <p className="text-sm text-gray-600">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">5. Your Rights</h4>
          <p className="text-sm text-gray-600">You have the right to:</p>
          <ul className="mt-2 ml-6 text-sm text-gray-600 list-disc">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of certain data uses</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">6. Cookies and Tracking</h4>
          <p className="text-sm text-gray-600">
            We use cookies and similar tracking technologies to track activity
            on our services and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">7. Changes to Privacy Policy</h4>
          <p className="text-sm text-gray-600">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;last updated&quot; date.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">8. Contact Us</h4>
          <p className="text-sm text-gray-600">
            If you have any questions about this Privacy Policy, please contact
            us through our support channels or reach out on social media.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const MobileSettings: React.FC<MobileSettingsProps> = ({ onClose }) => {
  const { user, logout, updateUser, uploadAvatar } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<
    "profile" | "notifications" | "privacy" | "help"
  >("profile");

  // Settings states
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [messageSounds, setMessageSounds] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  // Blocked users state
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [showBlockUserModal, setShowBlockUserModal] = useState(false);
  const [selectedUserToBlock, setSelectedUserToBlock] =
    useState<UserToBlock | null>(null);
  const [blockReason, setBlockReason] = useState("");

  // Search for users to block
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserSearch, setShowUserSearch] = useState(false);

  // FAQ state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Help & Support state
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Dynamic current year
  const currentYear = new Date().getFullYear();

  // Mock users for blocking
  const availableUsers: UserToBlock[] = [
    { id: "user1", name: "John Doe", email: "john@example.com", avatar: "" },
    { id: "user2", name: "Jane Smith", email: "jane@example.com", avatar: "" },
    { id: "user3", name: "Bob Wilson", email: "bob@example.com", avatar: "" },
    {
      id: "user4",
      name: "Alice Brown",
      email: "alice@example.com",
      avatar: "",
    },
    {
      id: "user5",
      name: "Charlie Lee",
      email: "charlie@example.com",
      avatar: "",
    },
  ].filter(
    (u) => u.id !== user?.id && !blockedUsers.some((b) => b.id === u.id),
  );

  // Filter users based on search
  const filteredUsers = availableUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!user) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const saveProfile = async () => {
    if (avatarFile) {
      await uploadAvatar(avatarFile);
    }
    if (editedUser) {
      updateUser(editedUser);
    }
    setEditMode(false);
  };

  const handleBlockUser = () => {
    if (selectedUserToBlock) {
      const userToBlock: BlockedUser = {
        id: selectedUserToBlock.id,
        name: selectedUserToBlock.name,
        email: selectedUserToBlock.email,
        avatar: selectedUserToBlock.avatar,
        blockedReason: blockReason || "No reason provided",
        blockedAt: new Date().toISOString(),
      };
      setBlockedUsers([...blockedUsers, userToBlock]);
      setSelectedUserToBlock(null);
      setBlockReason("");
      setShowBlockUserModal(false);
      setShowUserSearch(false);
      setSearchQuery("");
    }
  };

  const handleUnblockUser = (userId: string) => {
    setBlockedUsers(blockedUsers.filter((user) => user.id !== userId));
  };

  const handleSubmitContact = () => {
    if (contactSubject.trim() && contactMessage.trim()) {
      alert(
        `Support request submitted:\nSubject: ${contactSubject}\nMessage: ${contactMessage}`,
      );
      setContactSubject("");
      setContactMessage("");
      setShowContactForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Terms Modal */}
      {showTerms && <TermsContent onClose={() => setShowTerms(false)} />}

      {/* Privacy Modal */}
      {showPrivacy && <PrivacyContent onClose={() => setShowPrivacy(false)} />}

      {/* Header - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onClose}
            className="p-2 -ml-2 transition-colors rounded-lg hover:bg-gray-100"
            aria-label="Close settings"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
          <div className="w-10" />
        </div>

        {/* Tabs */}
        <div className="flex px-4 border-b border-gray-200">
          {["profile", "notifications", "privacy", "help"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(
                  tab as "profile" | "notifications" | "privacy" | "help",
                )
              }
              className={`flex-1 py-3 text-sm font-medium capitalize transition-colors relative ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-label={`${tab} settings`}
              aria-current={activeTab === tab ? "page" : undefined}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content - Scrollable with padding for fixed header */}
      <div className="min-h-screen pb-20 pt-28">
        {activeTab === "profile" && (
          <div className="p-4">
            {editMode ? (
              // Edit Mode
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 overflow-hidden bg-pink-500 rounded-full">
                      {avatarFile ? (
                        <Image
                          src={URL.createObjectURL(avatarFile)}
                          alt="Preview"
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      ) : user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.firstName}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-2xl font-semibold text-white">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 p-2 text-white transition-colors bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700"
                      aria-label="Upload avatar"
                    >
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      value={editedUser?.firstName || ""}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser!,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      value={editedUser?.lastName || ""}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser!,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Last Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={editedUser?.email || ""}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser!, email: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={editedUser?.phone || ""}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser!, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Phone"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bio"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      value={editedUser?.bio || ""}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser!, bio: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Bio"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={saveProfile}
                      className="flex-1 py-3 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                      aria-label="Save profile changes"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex-1 py-3 text-sm font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                      aria-label="Cancel editing"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                {/* Profile Header */}
                <div className="flex items-center gap-4 p-4 mb-6 bg-gray-50 rounded-xl">
                  <div className="shrink-0 w-16 h-16 overflow-hidden bg-pink-500 rounded-full">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.firstName}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-xl font-semibold text-white">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <span className="inline-flex items-center mt-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      ● Online
                    </span>
                  </div>
                </div>

                {/* Profile Info Cards */}
                <div className="mb-6 space-y-3">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="mb-1 text-xs text-gray-500">Role</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.role}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="mb-1 text-xs text-gray-500">Department</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.department}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="mb-1 text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.phone}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="mb-1 text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.location}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="mb-1 text-xs text-gray-500">Bio</p>
                    <p className="text-sm text-gray-900">{user.bio}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full py-3 mb-3 text-sm font-medium text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700"
                  aria-label="Edit profile"
                >
                  Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full py-3 text-sm font-medium text-red-600 transition-colors border border-red-300 rounded-xl hover:bg-red-50"
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="p-4">
            <div className="bg-white divide-y divide-gray-100 rounded-xl">
              <ToggleSwitch
                enabled={pushNotifications}
                onChange={setPushNotifications}
                label="Push Notifications"
                description="Receive push notifications on your device"
              />
              <ToggleSwitch
                enabled={emailNotifications}
                onChange={setEmailNotifications}
                label="Email Notifications"
                description="Get email updates about your account"
              />
              <ToggleSwitch
                enabled={messageSounds}
                onChange={setMessageSounds}
                label="Message Sounds"
                description="Play sound for new messages"
              />
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="p-4">
            <div className="bg-white divide-y divide-gray-100 rounded-xl">
              <ToggleSwitch
                enabled={onlineStatus}
                onChange={setOnlineStatus}
                label="Online Status"
                description="Show when you're online"
              />
              <ToggleSwitch
                enabled={readReceipts}
                onChange={setReadReceipts}
                label="Read Receipts"
                description="Show when you've read messages"
              />

              {/* Blocked Users Section */}
              <div className="py-2">
                <SettingsButton
                  onClick={() => setShowUserSearch(!showUserSearch)}
                  ariaLabel="Manage blocked users"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Blocked Users
                    </p>
                    <p className="text-xs text-gray-500">
                      {blockedUsers.length} users blocked
                    </p>
                  </div>
                </SettingsButton>

                {/* Search and Block Users */}
                {showUserSearch && (
                  <div className="px-4 pb-3">
                    <label
                      htmlFor="search-users"
                      className="block mb-1 text-xs font-medium text-gray-700"
                    >
                      Search users to block
                    </label>
                    <input
                      id="search-users"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search users to block..."
                      className="w-full px-3 py-2 mb-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      autoFocus
                    />

                    {/* Available Users List */}
                    <div className="mb-3 space-y-2 overflow-y-auto max-h-48">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((u) => (
                          <button
                            key={u.id}
                            onClick={() => {
                              setSelectedUserToBlock(u);
                              setShowUserSearch(false);
                              setShowBlockUserModal(true);
                            }}
                            className="flex items-center w-full gap-3 p-2 transition-colors rounded-lg hover:bg-gray-50"
                            aria-label={`Block ${u.name}`}
                          >
                            <div className="flex items-center justify-center w-8 h-8 text-xs text-white bg-gray-300 rounded-full">
                              {u.avatar ? (
                                <Image
                                  src={u.avatar}
                                  alt={u.name}
                                  width={32}
                                  height={32}
                                  className="object-cover w-full h-full rounded-full"
                                />
                              ) : (
                                u.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .substring(0, 2)
                              )}
                            </div>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-gray-900">
                                {u.name}
                              </p>
                              <p className="text-xs text-gray-500">{u.email}</p>
                            </div>
                          </button>
                        ))
                      ) : (
                        <p className="py-4 text-sm text-center text-gray-500">
                          {searchQuery
                            ? "No users found"
                            : "No users available to block"}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Blocked Users List */}
                {blockedUsers.length > 0 && (
                  <div className="px-4 mt-2 space-y-2">
                    <p className="mb-2 text-xs font-medium text-gray-500">
                      BLOCKED USERS
                    </p>
                    {blockedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 text-xs text-red-600 bg-red-100 rounded-full">
                            {user.avatar ? (
                              <Image
                                src={user.avatar}
                                alt={user.name}
                                width={32}
                                height={32}
                                className="object-cover w-full h-full rounded-full"
                              />
                            ) : (
                              user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleUnblockUser(user.id)}
                          className="px-3 py-1 text-xs text-blue-600 transition-colors border border-blue-300 rounded-full hover:bg-blue-50"
                          aria-label={`Unblock ${user.name}`}
                        >
                          Unblock
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "help" && (
          <div className="p-4">
            <div className="bg-white divide-y divide-gray-100 rounded-xl">
              {/* FAQ Section */}
              <div className="py-2">
                <SettingsButton
                  onClick={() => setExpandedFaq(expandedFaq === 0 ? null : 0)}
                  ariaLabel="Toggle FAQ"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">FAQ</p>
                    <p className="text-xs text-gray-500">
                      Frequently asked questions
                    </p>
                  </div>
                </SettingsButton>

                {expandedFaq === 0 && (
                  <div className="px-4 pb-3 space-y-3">
                    {faqData.map((faq, index) => (
                      <div key={index} className="p-3 rounded-lg bg-gray-50">
                        <p className="mb-1 text-sm font-medium text-gray-900">
                          {faq.question}
                        </p>
                        <p className="text-xs text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Support Section */}
              <div className="py-2">
                <SettingsButton
                  onClick={() => setShowContactForm(!showContactForm)}
                  ariaLabel="Toggle contact support form"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Contact Support
                    </p>
                    <p className="text-xs text-gray-500">
                      Get help from our team
                    </p>
                  </div>
                </SettingsButton>

                {showContactForm && (
                  <div className="px-4 pb-3 space-y-3">
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block mb-1 text-xs font-medium text-gray-700"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        placeholder="Subject"
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block mb-1 text-xs font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Describe your issue..."
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows={3}
                      />
                    </div>
                    <button
                      onClick={handleSubmitContact}
                      disabled={!contactSubject || !contactMessage}
                      className="w-full py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Submit support request"
                    >
                      Submit Request
                    </button>
                  </div>
                )}
              </div>

              {/* Support Tickets */}
              <div className="py-2">
                <SettingsButton
                  onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
                  ariaLabel="Toggle support tickets"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Support Tickets
                    </p>
                    <p className="text-xs text-gray-500">
                      View your support requests
                    </p>
                  </div>
                </SettingsButton>

                {expandedFaq === 1 && (
                  <div className="px-4 pb-3 space-y-2">
                    {supportTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {ticket.issue}
                          </p>
                          <p className="text-xs text-gray-500">{ticket.date}</p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            ticket.status === "Resolved"
                              ? "bg-green-100 text-green-700"
                              : ticket.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Terms of Service - Opens Modal */}
              <button
                onClick={() => setShowTerms(true)}
                className="w-full px-4 py-3 text-left transition-colors hover:bg-gray-50"
                aria-label="Read terms of service"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Terms of Service
                    </p>
                    <p className="text-xs text-gray-500">Read our terms</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              {/* Privacy Policy - Opens Modal */}
              <button
                onClick={() => setShowPrivacy(true)}
                className="w-full px-4 py-3 text-left transition-colors hover:bg-gray-50"
                aria-label="Read privacy policy"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Privacy Policy
                    </p>
                    <p className="text-xs text-gray-500">
                      Read our privacy policy
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              {/* Social Links - With Your Actual Profiles */}
              <div className="px-4 py-4">
                <p className="mb-3 text-sm font-medium text-gray-900">
                  Connect with us
                </p>
                <div className="flex justify-center gap-6">
                  <a
                    href="https://www.linkedin.com/in/abdul-hameed-website-developer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 group"
                    aria-label="Visit our LinkedIn page"
                  >
                    <div className="flex items-center justify-center w-12 h-12 transition-colors bg-blue-100 rounded-full group-hover:bg-blue-200">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.203 0 22.225 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/abdulhameed-developer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 group"
                    aria-label="Visit our GitHub page"
                  >
                    <div className="flex items-center justify-center w-12 h-12 transition-colors bg-gray-100 rounded-full group-hover:bg-gray-200">
                      <svg
                        className="w-6 h-6 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.335-1.76-1.335-1.76-1.09-.746.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.306.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.1.824 2.22 0 1.6-.015 2.89-.015 3.28 0 .32.216.7.83.58C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600">GitHub</span>
                  </a>
                </div>
              </div>

              {/* Version Info with Dynamic Year */}
              <div className="p-6 text-center">
                <p className="text-xs text-gray-400">Version 1.0.0</p>
                <p className="mt-1 text-xs text-gray-400">
                  © {currentYear} BOXpad. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Block User Confirmation Modal */}
      {showBlockUserModal && selectedUserToBlock && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => {
              setShowBlockUserModal(false);
              setSelectedUserToBlock(null);
              setBlockReason("");
            }}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white rounded-t-2xl animate-slideUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Block User
              </h3>
              <button
                onClick={() => {
                  setShowBlockUserModal(false);
                  setSelectedUserToBlock(null);
                  setBlockReason("");
                }}
                aria-label="Close block user modal"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-3 p-3 mb-3 rounded-lg bg-red-50">
                <div className="flex items-center justify-center w-10 h-10 font-semibold text-red-600 bg-red-200 rounded-full">
                  {selectedUserToBlock.avatar ? (
                    <Image
                      src={selectedUserToBlock.avatar}
                      alt={selectedUserToBlock.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    selectedUserToBlock.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .substring(0, 2)
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedUserToBlock.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedUserToBlock.email}
                  </p>
                </div>
              </div>

              <label
                htmlFor="block-reason"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Reason for blocking (optional)
              </label>
              <input
                id="block-reason"
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="e.g., Spam, Harassment, etc."
                className="w-full px-4 py-3 mb-4 text-sm bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                autoFocus
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleBlockUser}
                className="flex-1 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                aria-label="Confirm block user"
              >
                Block User
              </button>
              <button
                onClick={() => {
                  setShowBlockUserModal(false);
                  setSelectedUserToBlock(null);
                  setBlockReason("");
                }}
                className="flex-1 py-3 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
                aria-label="Cancel block"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
