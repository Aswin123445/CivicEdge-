/**
 * CivicEdge Icon Registry
 * ----------------------
 * This file is the single source of truth for all icons used in the app.
 * Do NOT import lucide icons directly in feature components.
 */

import {
  // Category / Domain Icons
  Construction,
  Trash2,
  Droplets,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Trees,
  MoreHorizontal,

  // Location & Mapping
  MapPin,
  Navigation,
  Globe,

  // Media & Evidence
  Camera,
  Image,
  Upload,
  FileText,

  // Status / Workflow
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,

  // Actions
  Plus,
  Edit3,
  Trash,
  Save,
  Send,
  ChevronRight,
  ChevronLeft,

  // User & Community
  Users,
  User,
  UserCheck,

  // Feedback & Engagement
  ThumbsUp,
  MessageCircle,
  BarChart3,

  // System / Misc
  Settings,
  HelpCircle,
  Bell,
} from "lucide-react";

/**
 * Semantic icon keys used across CivicEdge
 * ----------------------------------------
 * Keys should be stable, lowercase, snake_case.
 * Backend should send ONLY these keys.
 */

export const civicIconMap = {
  /* ===============================
   * ISSUE CATEGORIES
   * =============================== */
  Construction,
  Trash2,
  Droplets,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Trees,
  MoreHorizontal,

  /* ===============================
   * LOCATION & MAP
   * =============================== */
  location: MapPin,
  navigation: Navigation,
  global: Globe,

  /* ===============================
   * MEDIA / EVIDENCE
   * =============================== */
  photo: Camera,
  image: Image,
  upload: Upload,
  document: FileText,

  /* ===============================
   * ISSUE STATUS
   * =============================== */
  draft: Save,
  submitted: Send,
  pending: Clock,
  in_progress: Loader2,
  resolved: CheckCircle2,
  rejected: XCircle,
  warning: AlertTriangle,
  info: Info,

  /* ===============================
   * ACTIONS
   * =============================== */
  create: Plus,
  edit: Edit3,
  delete: Trash,
  save: Save,
  next: ChevronRight,
  back: ChevronLeft,

  /* ===============================
   * USERS & COMMUNITY
   * =============================== */
  users: Users,
  user: User,
  verified_user: UserCheck,

  /* ===============================
   * FEEDBACK & ANALYTICS
   * =============================== */
  like: ThumbsUp,
  comment: MessageCircle,
  analytics: BarChart3,

  /* ===============================
   * SYSTEM / UI
   * =============================== */
  settings: Settings,
  help: HelpCircle,
  notification: Bell,
};