import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_platform_role" AS ENUM('user', 'platform-support', 'platform-admin');
  CREATE TYPE "public"."enum_organization_memberships_role" AS ENUM('owner', 'admin', 'finance', 'analyst', 'developer', 'viewer');
  CREATE TYPE "public"."enum_organization_memberships_status" AS ENUM('invited', 'active', 'suspended');
  CREATE TYPE "public"."enum_organization_invitations_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_organization_invitations_role" AS ENUM('owner', 'admin', 'finance', 'analyst', 'developer', 'viewer');
  CREATE TYPE "public"."enum_organization_settings_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_google_connections_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_google_connection_scopes_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_play_console_profiles_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_google_ads_accounts_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_admob_accounts_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_apps_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_google_ads_campaigns_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_admob_apps_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_admob_ad_units_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_campaign_app_mappings_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_campaign_app_mappings_mapping_method" AS ENUM('exact-id', 'confirmed-auto', 'manual', 'fuzzy-suggestion');
  CREATE TYPE "public"."enum_admob_app_mappings_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_admob_app_mappings_mapping_method" AS ENUM('exact-id', 'confirmed-auto', 'manual', 'fuzzy-suggestion');
  CREATE TYPE "public"."enum_google_ads_daily_stats_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_admob_daily_stats_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_play_daily_stats_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_play_financial_transactions_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_play_financial_daily_aggregates_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_app_daily_financials_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_account_daily_financials_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_organization_daily_financials_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_manual_expenses_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_manual_expenses_allocation_method" AS ENUM('direct', 'fixed-percentage', 'revenue', 'ad-spend', 'equal', 'organization-only');
  CREATE TYPE "public"."enum_expense_categories_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_expense_allocations_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_currency_rates_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_sync_runs_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_sync_tasks_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_sync_cursors_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_source_files_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_integration_errors_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_notifications_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_saved_reports_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_report_exports_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_audit_logs_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TYPE "public"."enum_media_status" AS ENUM('active', 'inactive', 'pending', 'queued', 'running', 'completed', 'failed', 'cancelled', 'dead-letter', 'preliminary', 'finalized', 'archived');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"platform_role" "enum_users_platform_role" DEFAULT 'user' NOT NULL,
  	"active_organization_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"_verified" boolean,
  	"_verificationtoken" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "organizations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"base_currency" varchar DEFAULT 'USD' NOT NULL,
  	"timezone" varchar DEFAULT 'UTC' NOT NULL,
  	"fiscal_year_start" numeric DEFAULT 1,
  	"reporting_day_cutoff" numeric DEFAULT 0,
  	"archived_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organization_memberships" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"user_id" uuid NOT NULL,
  	"role" "enum_organization_memberships_role" NOT NULL,
  	"status" "enum_organization_memberships_status" DEFAULT 'active' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organization_invitations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_organization_invitations_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"email" varchar NOT NULL,
  	"role" "enum_organization_invitations_role",
  	"token_hash" varchar NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"accepted_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organization_settings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_organization_settings_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"break_even_tolerance" numeric DEFAULT 0.005,
  	"include_preliminary_admob" boolean DEFAULT true,
  	"developer_financial_access" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "google_connections" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_google_connections_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"google_email" varchar NOT NULL,
  	"encrypted_refresh_token" jsonb,
  	"token_key_version" varchar,
  	"last_health_check" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "google_connection_scopes" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_google_connection_scopes_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"connection_id" uuid NOT NULL,
  	"scope" varchar NOT NULL,
  	"granted_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "play_console_profiles" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_play_console_profiles_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"connection_id" uuid NOT NULL,
  	"developer_account_id" varchar,
  	"bucket_id" varchar,
  	"timezone" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "google_ads_accounts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_google_ads_accounts_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"connection_id" uuid NOT NULL,
  	"external_customer_id" varchar NOT NULL,
  	"manager_customer_id" varchar,
  	"timezone" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "admob_accounts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_admob_accounts_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"connection_id" uuid NOT NULL,
  	"publisher_id" varchar NOT NULL,
  	"timezone" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "apps" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_apps_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"package_name" varchar NOT NULL,
  	"display_package_name" varchar,
  	"play_profile_id" uuid,
  	"icon_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "google_ads_campaigns" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_google_ads_campaigns_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"source_account_id" uuid NOT NULL,
  	"external_campaign_id" varchar NOT NULL,
  	"app_id" varchar,
  	"channel_type" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "admob_apps" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_admob_apps_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"source_account_id" uuid NOT NULL,
  	"package_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "admob_ad_units" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_admob_ad_units_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"admob_app_id" uuid NOT NULL,
  	"format" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "campaign_app_mappings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_campaign_app_mappings_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"campaign_id" uuid NOT NULL,
  	"app_id" uuid NOT NULL,
  	"mapping_method" "enum_campaign_app_mappings_mapping_method" NOT NULL,
  	"confidence" numeric,
  	"confirmed_by_id" uuid,
  	"confirmed_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "admob_app_mappings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_admob_app_mappings_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"admob_app_id" uuid NOT NULL,
  	"app_id" uuid NOT NULL,
  	"mapping_method" "enum_admob_app_mappings_mapping_method",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "google_ads_daily_stats" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_google_ads_daily_stats_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"app_id" uuid,
  	"source_account_id" varchar,
  	"source_key" varchar,
  	"micros" numeric,
  	"calculation_version" varchar,
  	"finalized" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "admob_daily_stats" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_admob_daily_stats_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"app_id" uuid,
  	"source_account_id" varchar,
  	"source_key" varchar,
  	"micros" numeric,
  	"calculation_version" varchar,
  	"finalized" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "play_daily_stats" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_play_daily_stats_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"app_id" uuid,
  	"source_account_id" varchar,
  	"source_key" varchar,
  	"micros" numeric,
  	"calculation_version" varchar,
  	"finalized" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "play_financial_transactions" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_play_financial_transactions_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"app_id" uuid,
  	"source_account_id" varchar,
  	"source_key" varchar,
  	"micros" numeric,
  	"calculation_version" varchar,
  	"finalized" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "play_financial_daily_aggregates" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_play_financial_daily_aggregates_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"app_id" uuid,
  	"source_account_id" varchar,
  	"source_key" varchar,
  	"micros" numeric,
  	"calculation_version" varchar,
  	"finalized" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "app_daily_financials" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_app_daily_financials_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"app_id" uuid,
  	"source_account_id" varchar,
  	"source_key" varchar,
  	"micros" numeric,
  	"calculation_version" varchar,
  	"finalized" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "account_daily_financials" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_account_daily_financials_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"app_id" uuid,
  	"source_account_id" varchar,
  	"source_key" varchar,
  	"micros" numeric,
  	"calculation_version" varchar,
  	"finalized" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organization_daily_financials" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_organization_daily_financials_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"app_id" uuid,
  	"source_account_id" varchar,
  	"source_key" varchar,
  	"micros" numeric,
  	"calculation_version" varchar,
  	"finalized" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "manual_expenses" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_manual_expenses_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"vendor" varchar,
  	"description" varchar NOT NULL,
  	"category_id" uuid NOT NULL,
  	"app_id" uuid,
  	"tax_amount" numeric,
  	"recurring" boolean,
  	"allocation_method" "enum_manual_expenses_allocation_method",
  	"receipt_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "expense_categories" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_expense_categories_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "expense_allocations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_expense_allocations_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"expense_id" uuid NOT NULL,
  	"app_id" uuid NOT NULL,
  	"percentage" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "currency_rates" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_currency_rates_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"quote_currency" varchar,
  	"rate" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sync_runs" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_sync_runs_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"correlation_id" varchar,
  	"idempotency_key" varchar,
  	"attempts" numeric DEFAULT 0,
  	"next_attempt_at" timestamp(3) with time zone,
  	"last_error" varchar,
  	"payload" jsonb,
  	"expires_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sync_tasks" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_sync_tasks_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"correlation_id" varchar,
  	"idempotency_key" varchar,
  	"attempts" numeric DEFAULT 0,
  	"next_attempt_at" timestamp(3) with time zone,
  	"last_error" varchar,
  	"payload" jsonb,
  	"expires_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sync_cursors" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_sync_cursors_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"correlation_id" varchar,
  	"idempotency_key" varchar,
  	"attempts" numeric DEFAULT 0,
  	"next_attempt_at" timestamp(3) with time zone,
  	"last_error" varchar,
  	"payload" jsonb,
  	"expires_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "source_files" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_source_files_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"correlation_id" varchar,
  	"idempotency_key" varchar,
  	"attempts" numeric DEFAULT 0,
  	"next_attempt_at" timestamp(3) with time zone,
  	"last_error" varchar,
  	"payload" jsonb,
  	"expires_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "integration_errors" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_integration_errors_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"correlation_id" varchar,
  	"idempotency_key" varchar,
  	"attempts" numeric DEFAULT 0,
  	"next_attempt_at" timestamp(3) with time zone,
  	"last_error" varchar,
  	"payload" jsonb,
  	"expires_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "notifications" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_notifications_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"correlation_id" varchar,
  	"idempotency_key" varchar,
  	"attempts" numeric DEFAULT 0,
  	"next_attempt_at" timestamp(3) with time zone,
  	"last_error" varchar,
  	"payload" jsonb,
  	"expires_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "saved_reports" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_saved_reports_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"correlation_id" varchar,
  	"idempotency_key" varchar,
  	"attempts" numeric DEFAULT 0,
  	"next_attempt_at" timestamp(3) with time zone,
  	"last_error" varchar,
  	"payload" jsonb,
  	"expires_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "report_exports" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_report_exports_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"correlation_id" varchar,
  	"idempotency_key" varchar,
  	"attempts" numeric DEFAULT 0,
  	"next_attempt_at" timestamp(3) with time zone,
  	"last_error" varchar,
  	"payload" jsonb,
  	"expires_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "audit_logs" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_audit_logs_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"correlation_id" varchar,
  	"idempotency_key" varchar,
  	"attempts" numeric DEFAULT 0,
  	"next_attempt_at" timestamp(3) with time zone,
  	"last_error" varchar,
  	"payload" jsonb,
  	"expires_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" uuid NOT NULL,
  	"name" varchar,
  	"external_id" varchar,
  	"date" timestamp(3) with time zone,
  	"amount" numeric,
  	"currency" varchar,
  	"status" "enum_media_status",
  	"source_metadata" jsonb,
  	"archived_at" timestamp(3) with time zone,
  	"pathname" varchar NOT NULL,
  	"content_type" varchar NOT NULL,
  	"size" numeric NOT NULL,
  	"checksum" varchar NOT NULL,
  	"original_filename" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"uploader_id" uuid,
  	"retention_until" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid,
  	"organizations_id" uuid,
  	"organization_memberships_id" uuid,
  	"organization_invitations_id" uuid,
  	"organization_settings_id" uuid,
  	"google_connections_id" uuid,
  	"google_connection_scopes_id" uuid,
  	"play_console_profiles_id" uuid,
  	"google_ads_accounts_id" uuid,
  	"admob_accounts_id" uuid,
  	"apps_id" uuid,
  	"google_ads_campaigns_id" uuid,
  	"admob_apps_id" uuid,
  	"admob_ad_units_id" uuid,
  	"campaign_app_mappings_id" uuid,
  	"admob_app_mappings_id" uuid,
  	"google_ads_daily_stats_id" uuid,
  	"admob_daily_stats_id" uuid,
  	"play_daily_stats_id" uuid,
  	"play_financial_transactions_id" uuid,
  	"play_financial_daily_aggregates_id" uuid,
  	"app_daily_financials_id" uuid,
  	"account_daily_financials_id" uuid,
  	"organization_daily_financials_id" uuid,
  	"manual_expenses_id" uuid,
  	"expense_categories_id" uuid,
  	"expense_allocations_id" uuid,
  	"currency_rates_id" uuid,
  	"sync_runs_id" uuid,
  	"sync_tasks_id" uuid,
  	"sync_cursors_id" uuid,
  	"source_files_id" uuid,
  	"integration_errors_id" uuid,
  	"notifications_id" uuid,
  	"saved_reports_id" uuid,
  	"report_exports_id" uuid,
  	"audit_logs_id" uuid,
  	"media_id" uuid
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_active_organization_id_organizations_id_fk" FOREIGN KEY ("active_organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organization_settings" ADD CONSTRAINT "organization_settings_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "google_connections" ADD CONSTRAINT "google_connections_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "google_connection_scopes" ADD CONSTRAINT "google_connection_scopes_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "google_connection_scopes" ADD CONSTRAINT "google_connection_scopes_connection_id_google_connections_id_fk" FOREIGN KEY ("connection_id") REFERENCES "public"."google_connections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "play_console_profiles" ADD CONSTRAINT "play_console_profiles_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "play_console_profiles" ADD CONSTRAINT "play_console_profiles_connection_id_google_connections_id_fk" FOREIGN KEY ("connection_id") REFERENCES "public"."google_connections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "google_ads_accounts" ADD CONSTRAINT "google_ads_accounts_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "google_ads_accounts" ADD CONSTRAINT "google_ads_accounts_connection_id_google_connections_id_fk" FOREIGN KEY ("connection_id") REFERENCES "public"."google_connections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admob_accounts" ADD CONSTRAINT "admob_accounts_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admob_accounts" ADD CONSTRAINT "admob_accounts_connection_id_google_connections_id_fk" FOREIGN KEY ("connection_id") REFERENCES "public"."google_connections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "apps" ADD CONSTRAINT "apps_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "apps" ADD CONSTRAINT "apps_play_profile_id_play_console_profiles_id_fk" FOREIGN KEY ("play_profile_id") REFERENCES "public"."play_console_profiles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "google_ads_campaigns" ADD CONSTRAINT "google_ads_campaigns_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "google_ads_campaigns" ADD CONSTRAINT "google_ads_campaigns_source_account_id_google_ads_accounts_id_fk" FOREIGN KEY ("source_account_id") REFERENCES "public"."google_ads_accounts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admob_apps" ADD CONSTRAINT "admob_apps_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admob_apps" ADD CONSTRAINT "admob_apps_source_account_id_admob_accounts_id_fk" FOREIGN KEY ("source_account_id") REFERENCES "public"."admob_accounts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admob_ad_units" ADD CONSTRAINT "admob_ad_units_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admob_ad_units" ADD CONSTRAINT "admob_ad_units_admob_app_id_admob_apps_id_fk" FOREIGN KEY ("admob_app_id") REFERENCES "public"."admob_apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "campaign_app_mappings" ADD CONSTRAINT "campaign_app_mappings_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "campaign_app_mappings" ADD CONSTRAINT "campaign_app_mappings_campaign_id_google_ads_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."google_ads_campaigns"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "campaign_app_mappings" ADD CONSTRAINT "campaign_app_mappings_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "campaign_app_mappings" ADD CONSTRAINT "campaign_app_mappings_confirmed_by_id_users_id_fk" FOREIGN KEY ("confirmed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admob_app_mappings" ADD CONSTRAINT "admob_app_mappings_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admob_app_mappings" ADD CONSTRAINT "admob_app_mappings_admob_app_id_admob_apps_id_fk" FOREIGN KEY ("admob_app_id") REFERENCES "public"."admob_apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admob_app_mappings" ADD CONSTRAINT "admob_app_mappings_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "google_ads_daily_stats" ADD CONSTRAINT "google_ads_daily_stats_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "google_ads_daily_stats" ADD CONSTRAINT "google_ads_daily_stats_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admob_daily_stats" ADD CONSTRAINT "admob_daily_stats_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admob_daily_stats" ADD CONSTRAINT "admob_daily_stats_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "play_daily_stats" ADD CONSTRAINT "play_daily_stats_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "play_daily_stats" ADD CONSTRAINT "play_daily_stats_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "play_financial_transactions" ADD CONSTRAINT "play_financial_transactions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "play_financial_transactions" ADD CONSTRAINT "play_financial_transactions_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "play_financial_daily_aggregates" ADD CONSTRAINT "play_financial_daily_aggregates_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "play_financial_daily_aggregates" ADD CONSTRAINT "play_financial_daily_aggregates_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "app_daily_financials" ADD CONSTRAINT "app_daily_financials_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "app_daily_financials" ADD CONSTRAINT "app_daily_financials_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "account_daily_financials" ADD CONSTRAINT "account_daily_financials_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "account_daily_financials" ADD CONSTRAINT "account_daily_financials_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organization_daily_financials" ADD CONSTRAINT "organization_daily_financials_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organization_daily_financials" ADD CONSTRAINT "organization_daily_financials_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "manual_expenses" ADD CONSTRAINT "manual_expenses_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "manual_expenses" ADD CONSTRAINT "manual_expenses_category_id_expense_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."expense_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "manual_expenses" ADD CONSTRAINT "manual_expenses_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "manual_expenses" ADD CONSTRAINT "manual_expenses_receipt_id_media_id_fk" FOREIGN KEY ("receipt_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expense_categories" ADD CONSTRAINT "expense_categories_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expense_allocations" ADD CONSTRAINT "expense_allocations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expense_allocations" ADD CONSTRAINT "expense_allocations_expense_id_manual_expenses_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."manual_expenses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expense_allocations" ADD CONSTRAINT "expense_allocations_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "currency_rates" ADD CONSTRAINT "currency_rates_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sync_runs" ADD CONSTRAINT "sync_runs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sync_tasks" ADD CONSTRAINT "sync_tasks_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sync_cursors" ADD CONSTRAINT "sync_cursors_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "source_files" ADD CONSTRAINT "source_files_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "integration_errors" ADD CONSTRAINT "integration_errors_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notifications" ADD CONSTRAINT "notifications_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "saved_reports" ADD CONSTRAINT "saved_reports_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "report_exports" ADD CONSTRAINT "report_exports_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_uploader_id_users_id_fk" FOREIGN KEY ("uploader_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organization_memberships_fk" FOREIGN KEY ("organization_memberships_id") REFERENCES "public"."organization_memberships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organization_invitations_fk" FOREIGN KEY ("organization_invitations_id") REFERENCES "public"."organization_invitations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organization_settings_fk" FOREIGN KEY ("organization_settings_id") REFERENCES "public"."organization_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_google_connections_fk" FOREIGN KEY ("google_connections_id") REFERENCES "public"."google_connections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_google_connection_scopes_fk" FOREIGN KEY ("google_connection_scopes_id") REFERENCES "public"."google_connection_scopes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_play_console_profiles_fk" FOREIGN KEY ("play_console_profiles_id") REFERENCES "public"."play_console_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_google_ads_accounts_fk" FOREIGN KEY ("google_ads_accounts_id") REFERENCES "public"."google_ads_accounts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admob_accounts_fk" FOREIGN KEY ("admob_accounts_id") REFERENCES "public"."admob_accounts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_apps_fk" FOREIGN KEY ("apps_id") REFERENCES "public"."apps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_google_ads_campaigns_fk" FOREIGN KEY ("google_ads_campaigns_id") REFERENCES "public"."google_ads_campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admob_apps_fk" FOREIGN KEY ("admob_apps_id") REFERENCES "public"."admob_apps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admob_ad_units_fk" FOREIGN KEY ("admob_ad_units_id") REFERENCES "public"."admob_ad_units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_campaign_app_mappings_fk" FOREIGN KEY ("campaign_app_mappings_id") REFERENCES "public"."campaign_app_mappings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admob_app_mappings_fk" FOREIGN KEY ("admob_app_mappings_id") REFERENCES "public"."admob_app_mappings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_google_ads_daily_stats_fk" FOREIGN KEY ("google_ads_daily_stats_id") REFERENCES "public"."google_ads_daily_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admob_daily_stats_fk" FOREIGN KEY ("admob_daily_stats_id") REFERENCES "public"."admob_daily_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_play_daily_stats_fk" FOREIGN KEY ("play_daily_stats_id") REFERENCES "public"."play_daily_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_play_financial_transactions_fk" FOREIGN KEY ("play_financial_transactions_id") REFERENCES "public"."play_financial_transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_play_financial_daily_aggreg_fk" FOREIGN KEY ("play_financial_daily_aggregates_id") REFERENCES "public"."play_financial_daily_aggregates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_app_daily_financials_fk" FOREIGN KEY ("app_daily_financials_id") REFERENCES "public"."app_daily_financials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_account_daily_financials_fk" FOREIGN KEY ("account_daily_financials_id") REFERENCES "public"."account_daily_financials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organization_daily_financia_fk" FOREIGN KEY ("organization_daily_financials_id") REFERENCES "public"."organization_daily_financials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_manual_expenses_fk" FOREIGN KEY ("manual_expenses_id") REFERENCES "public"."manual_expenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_expense_categories_fk" FOREIGN KEY ("expense_categories_id") REFERENCES "public"."expense_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_expense_allocations_fk" FOREIGN KEY ("expense_allocations_id") REFERENCES "public"."expense_allocations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_currency_rates_fk" FOREIGN KEY ("currency_rates_id") REFERENCES "public"."currency_rates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sync_runs_fk" FOREIGN KEY ("sync_runs_id") REFERENCES "public"."sync_runs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sync_tasks_fk" FOREIGN KEY ("sync_tasks_id") REFERENCES "public"."sync_tasks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sync_cursors_fk" FOREIGN KEY ("sync_cursors_id") REFERENCES "public"."sync_cursors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_source_files_fk" FOREIGN KEY ("source_files_id") REFERENCES "public"."source_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_integration_errors_fk" FOREIGN KEY ("integration_errors_id") REFERENCES "public"."integration_errors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_notifications_fk" FOREIGN KEY ("notifications_id") REFERENCES "public"."notifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_saved_reports_fk" FOREIGN KEY ("saved_reports_id") REFERENCES "public"."saved_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_report_exports_fk" FOREIGN KEY ("report_exports_id") REFERENCES "public"."report_exports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_logs_fk" FOREIGN KEY ("audit_logs_id") REFERENCES "public"."audit_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_active_organization_idx" ON "users" USING btree ("active_organization_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "organizations_name_idx" ON "organizations" USING btree ("name");
  CREATE UNIQUE INDEX "organizations_slug_idx" ON "organizations" USING btree ("slug");
  CREATE INDEX "organizations_updated_at_idx" ON "organizations" USING btree ("updated_at");
  CREATE INDEX "organizations_created_at_idx" ON "organizations" USING btree ("created_at");
  CREATE INDEX "organization_memberships_organization_idx" ON "organization_memberships" USING btree ("organization_id");
  CREATE INDEX "organization_memberships_user_idx" ON "organization_memberships" USING btree ("user_id");
  CREATE INDEX "organization_memberships_updated_at_idx" ON "organization_memberships" USING btree ("updated_at");
  CREATE INDEX "organization_memberships_created_at_idx" ON "organization_memberships" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_user_idx" ON "organization_memberships" USING btree ("organization_id","user_id");
  CREATE INDEX "organization_invitations_organization_idx" ON "organization_invitations" USING btree ("organization_id");
  CREATE INDEX "organization_invitations_name_idx" ON "organization_invitations" USING btree ("name");
  CREATE INDEX "organization_invitations_external_id_idx" ON "organization_invitations" USING btree ("external_id");
  CREATE INDEX "organization_invitations_date_idx" ON "organization_invitations" USING btree ("date");
  CREATE INDEX "organization_invitations_updated_at_idx" ON "organization_invitations" USING btree ("updated_at");
  CREATE INDEX "organization_invitations_created_at_idx" ON "organization_invitations" USING btree ("created_at");
  CREATE INDEX "organization_settings_organization_idx" ON "organization_settings" USING btree ("organization_id");
  CREATE INDEX "organization_settings_name_idx" ON "organization_settings" USING btree ("name");
  CREATE INDEX "organization_settings_external_id_idx" ON "organization_settings" USING btree ("external_id");
  CREATE INDEX "organization_settings_date_idx" ON "organization_settings" USING btree ("date");
  CREATE INDEX "organization_settings_updated_at_idx" ON "organization_settings" USING btree ("updated_at");
  CREATE INDEX "organization_settings_created_at_idx" ON "organization_settings" USING btree ("created_at");
  CREATE INDEX "google_connections_organization_idx" ON "google_connections" USING btree ("organization_id");
  CREATE INDEX "google_connections_name_idx" ON "google_connections" USING btree ("name");
  CREATE INDEX "google_connections_external_id_idx" ON "google_connections" USING btree ("external_id");
  CREATE INDEX "google_connections_date_idx" ON "google_connections" USING btree ("date");
  CREATE INDEX "google_connections_updated_at_idx" ON "google_connections" USING btree ("updated_at");
  CREATE INDEX "google_connections_created_at_idx" ON "google_connections" USING btree ("created_at");
  CREATE INDEX "google_connection_scopes_organization_idx" ON "google_connection_scopes" USING btree ("organization_id");
  CREATE INDEX "google_connection_scopes_name_idx" ON "google_connection_scopes" USING btree ("name");
  CREATE INDEX "google_connection_scopes_external_id_idx" ON "google_connection_scopes" USING btree ("external_id");
  CREATE INDEX "google_connection_scopes_date_idx" ON "google_connection_scopes" USING btree ("date");
  CREATE INDEX "google_connection_scopes_connection_idx" ON "google_connection_scopes" USING btree ("connection_id");
  CREATE INDEX "google_connection_scopes_updated_at_idx" ON "google_connection_scopes" USING btree ("updated_at");
  CREATE INDEX "google_connection_scopes_created_at_idx" ON "google_connection_scopes" USING btree ("created_at");
  CREATE INDEX "play_console_profiles_organization_idx" ON "play_console_profiles" USING btree ("organization_id");
  CREATE INDEX "play_console_profiles_name_idx" ON "play_console_profiles" USING btree ("name");
  CREATE INDEX "play_console_profiles_external_id_idx" ON "play_console_profiles" USING btree ("external_id");
  CREATE INDEX "play_console_profiles_date_idx" ON "play_console_profiles" USING btree ("date");
  CREATE INDEX "play_console_profiles_connection_idx" ON "play_console_profiles" USING btree ("connection_id");
  CREATE INDEX "play_console_profiles_updated_at_idx" ON "play_console_profiles" USING btree ("updated_at");
  CREATE INDEX "play_console_profiles_created_at_idx" ON "play_console_profiles" USING btree ("created_at");
  CREATE INDEX "google_ads_accounts_organization_idx" ON "google_ads_accounts" USING btree ("organization_id");
  CREATE INDEX "google_ads_accounts_name_idx" ON "google_ads_accounts" USING btree ("name");
  CREATE INDEX "google_ads_accounts_external_id_idx" ON "google_ads_accounts" USING btree ("external_id");
  CREATE INDEX "google_ads_accounts_date_idx" ON "google_ads_accounts" USING btree ("date");
  CREATE INDEX "google_ads_accounts_connection_idx" ON "google_ads_accounts" USING btree ("connection_id");
  CREATE INDEX "google_ads_accounts_external_customer_id_idx" ON "google_ads_accounts" USING btree ("external_customer_id");
  CREATE INDEX "google_ads_accounts_updated_at_idx" ON "google_ads_accounts" USING btree ("updated_at");
  CREATE INDEX "google_ads_accounts_created_at_idx" ON "google_ads_accounts" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_externalCustomerId_idx" ON "google_ads_accounts" USING btree ("organization_id","external_customer_id");
  CREATE INDEX "admob_accounts_organization_idx" ON "admob_accounts" USING btree ("organization_id");
  CREATE INDEX "admob_accounts_name_idx" ON "admob_accounts" USING btree ("name");
  CREATE INDEX "admob_accounts_external_id_idx" ON "admob_accounts" USING btree ("external_id");
  CREATE INDEX "admob_accounts_date_idx" ON "admob_accounts" USING btree ("date");
  CREATE INDEX "admob_accounts_connection_idx" ON "admob_accounts" USING btree ("connection_id");
  CREATE INDEX "admob_accounts_publisher_id_idx" ON "admob_accounts" USING btree ("publisher_id");
  CREATE INDEX "admob_accounts_updated_at_idx" ON "admob_accounts" USING btree ("updated_at");
  CREATE INDEX "admob_accounts_created_at_idx" ON "admob_accounts" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_publisherId_idx" ON "admob_accounts" USING btree ("organization_id","publisher_id");
  CREATE INDEX "apps_organization_idx" ON "apps" USING btree ("organization_id");
  CREATE INDEX "apps_name_idx" ON "apps" USING btree ("name");
  CREATE INDEX "apps_external_id_idx" ON "apps" USING btree ("external_id");
  CREATE INDEX "apps_date_idx" ON "apps" USING btree ("date");
  CREATE INDEX "apps_package_name_idx" ON "apps" USING btree ("package_name");
  CREATE INDEX "apps_play_profile_idx" ON "apps" USING btree ("play_profile_id");
  CREATE INDEX "apps_updated_at_idx" ON "apps" USING btree ("updated_at");
  CREATE INDEX "apps_created_at_idx" ON "apps" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_packageName_idx" ON "apps" USING btree ("organization_id","package_name");
  CREATE INDEX "google_ads_campaigns_organization_idx" ON "google_ads_campaigns" USING btree ("organization_id");
  CREATE INDEX "google_ads_campaigns_name_idx" ON "google_ads_campaigns" USING btree ("name");
  CREATE INDEX "google_ads_campaigns_external_id_idx" ON "google_ads_campaigns" USING btree ("external_id");
  CREATE INDEX "google_ads_campaigns_date_idx" ON "google_ads_campaigns" USING btree ("date");
  CREATE INDEX "google_ads_campaigns_source_account_idx" ON "google_ads_campaigns" USING btree ("source_account_id");
  CREATE INDEX "google_ads_campaigns_external_campaign_id_idx" ON "google_ads_campaigns" USING btree ("external_campaign_id");
  CREATE INDEX "google_ads_campaigns_app_id_idx" ON "google_ads_campaigns" USING btree ("app_id");
  CREATE INDEX "google_ads_campaigns_updated_at_idx" ON "google_ads_campaigns" USING btree ("updated_at");
  CREATE INDEX "google_ads_campaigns_created_at_idx" ON "google_ads_campaigns" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_sourceAccount_externalCampaignId_idx" ON "google_ads_campaigns" USING btree ("organization_id","source_account_id","external_campaign_id");
  CREATE INDEX "admob_apps_organization_idx" ON "admob_apps" USING btree ("organization_id");
  CREATE INDEX "admob_apps_name_idx" ON "admob_apps" USING btree ("name");
  CREATE INDEX "admob_apps_external_id_idx" ON "admob_apps" USING btree ("external_id");
  CREATE INDEX "admob_apps_date_idx" ON "admob_apps" USING btree ("date");
  CREATE INDEX "admob_apps_source_account_idx" ON "admob_apps" USING btree ("source_account_id");
  CREATE INDEX "admob_apps_package_name_idx" ON "admob_apps" USING btree ("package_name");
  CREATE INDEX "admob_apps_updated_at_idx" ON "admob_apps" USING btree ("updated_at");
  CREATE INDEX "admob_apps_created_at_idx" ON "admob_apps" USING btree ("created_at");
  CREATE INDEX "admob_ad_units_organization_idx" ON "admob_ad_units" USING btree ("organization_id");
  CREATE INDEX "admob_ad_units_name_idx" ON "admob_ad_units" USING btree ("name");
  CREATE INDEX "admob_ad_units_external_id_idx" ON "admob_ad_units" USING btree ("external_id");
  CREATE INDEX "admob_ad_units_date_idx" ON "admob_ad_units" USING btree ("date");
  CREATE INDEX "admob_ad_units_admob_app_idx" ON "admob_ad_units" USING btree ("admob_app_id");
  CREATE INDEX "admob_ad_units_updated_at_idx" ON "admob_ad_units" USING btree ("updated_at");
  CREATE INDEX "admob_ad_units_created_at_idx" ON "admob_ad_units" USING btree ("created_at");
  CREATE INDEX "campaign_app_mappings_organization_idx" ON "campaign_app_mappings" USING btree ("organization_id");
  CREATE INDEX "campaign_app_mappings_name_idx" ON "campaign_app_mappings" USING btree ("name");
  CREATE INDEX "campaign_app_mappings_external_id_idx" ON "campaign_app_mappings" USING btree ("external_id");
  CREATE INDEX "campaign_app_mappings_date_idx" ON "campaign_app_mappings" USING btree ("date");
  CREATE INDEX "campaign_app_mappings_campaign_idx" ON "campaign_app_mappings" USING btree ("campaign_id");
  CREATE INDEX "campaign_app_mappings_app_idx" ON "campaign_app_mappings" USING btree ("app_id");
  CREATE INDEX "campaign_app_mappings_confirmed_by_idx" ON "campaign_app_mappings" USING btree ("confirmed_by_id");
  CREATE INDEX "campaign_app_mappings_updated_at_idx" ON "campaign_app_mappings" USING btree ("updated_at");
  CREATE INDEX "campaign_app_mappings_created_at_idx" ON "campaign_app_mappings" USING btree ("created_at");
  CREATE INDEX "admob_app_mappings_organization_idx" ON "admob_app_mappings" USING btree ("organization_id");
  CREATE INDEX "admob_app_mappings_name_idx" ON "admob_app_mappings" USING btree ("name");
  CREATE INDEX "admob_app_mappings_external_id_idx" ON "admob_app_mappings" USING btree ("external_id");
  CREATE INDEX "admob_app_mappings_date_idx" ON "admob_app_mappings" USING btree ("date");
  CREATE INDEX "admob_app_mappings_admob_app_idx" ON "admob_app_mappings" USING btree ("admob_app_id");
  CREATE INDEX "admob_app_mappings_app_idx" ON "admob_app_mappings" USING btree ("app_id");
  CREATE INDEX "admob_app_mappings_updated_at_idx" ON "admob_app_mappings" USING btree ("updated_at");
  CREATE INDEX "admob_app_mappings_created_at_idx" ON "admob_app_mappings" USING btree ("created_at");
  CREATE INDEX "google_ads_daily_stats_organization_idx" ON "google_ads_daily_stats" USING btree ("organization_id");
  CREATE INDEX "google_ads_daily_stats_name_idx" ON "google_ads_daily_stats" USING btree ("name");
  CREATE INDEX "google_ads_daily_stats_external_id_idx" ON "google_ads_daily_stats" USING btree ("external_id");
  CREATE INDEX "google_ads_daily_stats_date_idx" ON "google_ads_daily_stats" USING btree ("date");
  CREATE INDEX "google_ads_daily_stats_app_idx" ON "google_ads_daily_stats" USING btree ("app_id");
  CREATE INDEX "google_ads_daily_stats_source_account_id_idx" ON "google_ads_daily_stats" USING btree ("source_account_id");
  CREATE INDEX "google_ads_daily_stats_source_key_idx" ON "google_ads_daily_stats" USING btree ("source_key");
  CREATE INDEX "google_ads_daily_stats_updated_at_idx" ON "google_ads_daily_stats" USING btree ("updated_at");
  CREATE INDEX "google_ads_daily_stats_created_at_idx" ON "google_ads_daily_stats" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_app_date_sourceKey_idx" ON "google_ads_daily_stats" USING btree ("organization_id","app_id","date","source_key");
  CREATE INDEX "admob_daily_stats_organization_idx" ON "admob_daily_stats" USING btree ("organization_id");
  CREATE INDEX "admob_daily_stats_name_idx" ON "admob_daily_stats" USING btree ("name");
  CREATE INDEX "admob_daily_stats_external_id_idx" ON "admob_daily_stats" USING btree ("external_id");
  CREATE INDEX "admob_daily_stats_date_idx" ON "admob_daily_stats" USING btree ("date");
  CREATE INDEX "admob_daily_stats_app_idx" ON "admob_daily_stats" USING btree ("app_id");
  CREATE INDEX "admob_daily_stats_source_account_id_idx" ON "admob_daily_stats" USING btree ("source_account_id");
  CREATE INDEX "admob_daily_stats_source_key_idx" ON "admob_daily_stats" USING btree ("source_key");
  CREATE INDEX "admob_daily_stats_updated_at_idx" ON "admob_daily_stats" USING btree ("updated_at");
  CREATE INDEX "admob_daily_stats_created_at_idx" ON "admob_daily_stats" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_app_date_sourceKey_1_idx" ON "admob_daily_stats" USING btree ("organization_id","app_id","date","source_key");
  CREATE INDEX "play_daily_stats_organization_idx" ON "play_daily_stats" USING btree ("organization_id");
  CREATE INDEX "play_daily_stats_name_idx" ON "play_daily_stats" USING btree ("name");
  CREATE INDEX "play_daily_stats_external_id_idx" ON "play_daily_stats" USING btree ("external_id");
  CREATE INDEX "play_daily_stats_date_idx" ON "play_daily_stats" USING btree ("date");
  CREATE INDEX "play_daily_stats_app_idx" ON "play_daily_stats" USING btree ("app_id");
  CREATE INDEX "play_daily_stats_source_account_id_idx" ON "play_daily_stats" USING btree ("source_account_id");
  CREATE INDEX "play_daily_stats_source_key_idx" ON "play_daily_stats" USING btree ("source_key");
  CREATE INDEX "play_daily_stats_updated_at_idx" ON "play_daily_stats" USING btree ("updated_at");
  CREATE INDEX "play_daily_stats_created_at_idx" ON "play_daily_stats" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_app_date_sourceKey_2_idx" ON "play_daily_stats" USING btree ("organization_id","app_id","date","source_key");
  CREATE INDEX "play_financial_transactions_organization_idx" ON "play_financial_transactions" USING btree ("organization_id");
  CREATE INDEX "play_financial_transactions_name_idx" ON "play_financial_transactions" USING btree ("name");
  CREATE INDEX "play_financial_transactions_external_id_idx" ON "play_financial_transactions" USING btree ("external_id");
  CREATE INDEX "play_financial_transactions_date_idx" ON "play_financial_transactions" USING btree ("date");
  CREATE INDEX "play_financial_transactions_app_idx" ON "play_financial_transactions" USING btree ("app_id");
  CREATE INDEX "play_financial_transactions_source_account_id_idx" ON "play_financial_transactions" USING btree ("source_account_id");
  CREATE INDEX "play_financial_transactions_source_key_idx" ON "play_financial_transactions" USING btree ("source_key");
  CREATE INDEX "play_financial_transactions_updated_at_idx" ON "play_financial_transactions" USING btree ("updated_at");
  CREATE INDEX "play_financial_transactions_created_at_idx" ON "play_financial_transactions" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_app_date_sourceKey_3_idx" ON "play_financial_transactions" USING btree ("organization_id","app_id","date","source_key");
  CREATE INDEX "play_financial_daily_aggregates_organization_idx" ON "play_financial_daily_aggregates" USING btree ("organization_id");
  CREATE INDEX "play_financial_daily_aggregates_name_idx" ON "play_financial_daily_aggregates" USING btree ("name");
  CREATE INDEX "play_financial_daily_aggregates_external_id_idx" ON "play_financial_daily_aggregates" USING btree ("external_id");
  CREATE INDEX "play_financial_daily_aggregates_date_idx" ON "play_financial_daily_aggregates" USING btree ("date");
  CREATE INDEX "play_financial_daily_aggregates_app_idx" ON "play_financial_daily_aggregates" USING btree ("app_id");
  CREATE INDEX "play_financial_daily_aggregates_source_account_id_idx" ON "play_financial_daily_aggregates" USING btree ("source_account_id");
  CREATE INDEX "play_financial_daily_aggregates_source_key_idx" ON "play_financial_daily_aggregates" USING btree ("source_key");
  CREATE INDEX "play_financial_daily_aggregates_updated_at_idx" ON "play_financial_daily_aggregates" USING btree ("updated_at");
  CREATE INDEX "play_financial_daily_aggregates_created_at_idx" ON "play_financial_daily_aggregates" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_app_date_sourceKey_4_idx" ON "play_financial_daily_aggregates" USING btree ("organization_id","app_id","date","source_key");
  CREATE INDEX "app_daily_financials_organization_idx" ON "app_daily_financials" USING btree ("organization_id");
  CREATE INDEX "app_daily_financials_name_idx" ON "app_daily_financials" USING btree ("name");
  CREATE INDEX "app_daily_financials_external_id_idx" ON "app_daily_financials" USING btree ("external_id");
  CREATE INDEX "app_daily_financials_date_idx" ON "app_daily_financials" USING btree ("date");
  CREATE INDEX "app_daily_financials_app_idx" ON "app_daily_financials" USING btree ("app_id");
  CREATE INDEX "app_daily_financials_source_account_id_idx" ON "app_daily_financials" USING btree ("source_account_id");
  CREATE INDEX "app_daily_financials_source_key_idx" ON "app_daily_financials" USING btree ("source_key");
  CREATE INDEX "app_daily_financials_updated_at_idx" ON "app_daily_financials" USING btree ("updated_at");
  CREATE INDEX "app_daily_financials_created_at_idx" ON "app_daily_financials" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_app_date_sourceKey_5_idx" ON "app_daily_financials" USING btree ("organization_id","app_id","date","source_key");
  CREATE INDEX "account_daily_financials_organization_idx" ON "account_daily_financials" USING btree ("organization_id");
  CREATE INDEX "account_daily_financials_name_idx" ON "account_daily_financials" USING btree ("name");
  CREATE INDEX "account_daily_financials_external_id_idx" ON "account_daily_financials" USING btree ("external_id");
  CREATE INDEX "account_daily_financials_date_idx" ON "account_daily_financials" USING btree ("date");
  CREATE INDEX "account_daily_financials_app_idx" ON "account_daily_financials" USING btree ("app_id");
  CREATE INDEX "account_daily_financials_source_account_id_idx" ON "account_daily_financials" USING btree ("source_account_id");
  CREATE INDEX "account_daily_financials_source_key_idx" ON "account_daily_financials" USING btree ("source_key");
  CREATE INDEX "account_daily_financials_updated_at_idx" ON "account_daily_financials" USING btree ("updated_at");
  CREATE INDEX "account_daily_financials_created_at_idx" ON "account_daily_financials" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_app_date_sourceKey_6_idx" ON "account_daily_financials" USING btree ("organization_id","app_id","date","source_key");
  CREATE INDEX "organization_daily_financials_organization_idx" ON "organization_daily_financials" USING btree ("organization_id");
  CREATE INDEX "organization_daily_financials_name_idx" ON "organization_daily_financials" USING btree ("name");
  CREATE INDEX "organization_daily_financials_external_id_idx" ON "organization_daily_financials" USING btree ("external_id");
  CREATE INDEX "organization_daily_financials_date_idx" ON "organization_daily_financials" USING btree ("date");
  CREATE INDEX "organization_daily_financials_app_idx" ON "organization_daily_financials" USING btree ("app_id");
  CREATE INDEX "organization_daily_financials_source_account_id_idx" ON "organization_daily_financials" USING btree ("source_account_id");
  CREATE INDEX "organization_daily_financials_source_key_idx" ON "organization_daily_financials" USING btree ("source_key");
  CREATE INDEX "organization_daily_financials_updated_at_idx" ON "organization_daily_financials" USING btree ("updated_at");
  CREATE INDEX "organization_daily_financials_created_at_idx" ON "organization_daily_financials" USING btree ("created_at");
  CREATE UNIQUE INDEX "organization_app_date_sourceKey_7_idx" ON "organization_daily_financials" USING btree ("organization_id","app_id","date","source_key");
  CREATE INDEX "manual_expenses_organization_idx" ON "manual_expenses" USING btree ("organization_id");
  CREATE INDEX "manual_expenses_name_idx" ON "manual_expenses" USING btree ("name");
  CREATE INDEX "manual_expenses_external_id_idx" ON "manual_expenses" USING btree ("external_id");
  CREATE INDEX "manual_expenses_date_idx" ON "manual_expenses" USING btree ("date");
  CREATE INDEX "manual_expenses_category_idx" ON "manual_expenses" USING btree ("category_id");
  CREATE INDEX "manual_expenses_app_idx" ON "manual_expenses" USING btree ("app_id");
  CREATE INDEX "manual_expenses_receipt_idx" ON "manual_expenses" USING btree ("receipt_id");
  CREATE INDEX "manual_expenses_updated_at_idx" ON "manual_expenses" USING btree ("updated_at");
  CREATE INDEX "manual_expenses_created_at_idx" ON "manual_expenses" USING btree ("created_at");
  CREATE INDEX "expense_categories_organization_idx" ON "expense_categories" USING btree ("organization_id");
  CREATE INDEX "expense_categories_name_idx" ON "expense_categories" USING btree ("name");
  CREATE INDEX "expense_categories_external_id_idx" ON "expense_categories" USING btree ("external_id");
  CREATE INDEX "expense_categories_date_idx" ON "expense_categories" USING btree ("date");
  CREATE INDEX "expense_categories_updated_at_idx" ON "expense_categories" USING btree ("updated_at");
  CREATE INDEX "expense_categories_created_at_idx" ON "expense_categories" USING btree ("created_at");
  CREATE INDEX "expense_allocations_organization_idx" ON "expense_allocations" USING btree ("organization_id");
  CREATE INDEX "expense_allocations_name_idx" ON "expense_allocations" USING btree ("name");
  CREATE INDEX "expense_allocations_external_id_idx" ON "expense_allocations" USING btree ("external_id");
  CREATE INDEX "expense_allocations_date_idx" ON "expense_allocations" USING btree ("date");
  CREATE INDEX "expense_allocations_expense_idx" ON "expense_allocations" USING btree ("expense_id");
  CREATE INDEX "expense_allocations_app_idx" ON "expense_allocations" USING btree ("app_id");
  CREATE INDEX "expense_allocations_updated_at_idx" ON "expense_allocations" USING btree ("updated_at");
  CREATE INDEX "expense_allocations_created_at_idx" ON "expense_allocations" USING btree ("created_at");
  CREATE INDEX "currency_rates_organization_idx" ON "currency_rates" USING btree ("organization_id");
  CREATE INDEX "currency_rates_name_idx" ON "currency_rates" USING btree ("name");
  CREATE INDEX "currency_rates_external_id_idx" ON "currency_rates" USING btree ("external_id");
  CREATE INDEX "currency_rates_date_idx" ON "currency_rates" USING btree ("date");
  CREATE INDEX "currency_rates_updated_at_idx" ON "currency_rates" USING btree ("updated_at");
  CREATE INDEX "currency_rates_created_at_idx" ON "currency_rates" USING btree ("created_at");
  CREATE INDEX "sync_runs_organization_idx" ON "sync_runs" USING btree ("organization_id");
  CREATE INDEX "sync_runs_name_idx" ON "sync_runs" USING btree ("name");
  CREATE INDEX "sync_runs_external_id_idx" ON "sync_runs" USING btree ("external_id");
  CREATE INDEX "sync_runs_date_idx" ON "sync_runs" USING btree ("date");
  CREATE INDEX "sync_runs_correlation_id_idx" ON "sync_runs" USING btree ("correlation_id");
  CREATE INDEX "sync_runs_idempotency_key_idx" ON "sync_runs" USING btree ("idempotency_key");
  CREATE INDEX "sync_runs_next_attempt_at_idx" ON "sync_runs" USING btree ("next_attempt_at");
  CREATE INDEX "sync_runs_updated_at_idx" ON "sync_runs" USING btree ("updated_at");
  CREATE INDEX "sync_runs_created_at_idx" ON "sync_runs" USING btree ("created_at");
  CREATE INDEX "sync_tasks_organization_idx" ON "sync_tasks" USING btree ("organization_id");
  CREATE INDEX "sync_tasks_name_idx" ON "sync_tasks" USING btree ("name");
  CREATE INDEX "sync_tasks_external_id_idx" ON "sync_tasks" USING btree ("external_id");
  CREATE INDEX "sync_tasks_date_idx" ON "sync_tasks" USING btree ("date");
  CREATE INDEX "sync_tasks_correlation_id_idx" ON "sync_tasks" USING btree ("correlation_id");
  CREATE INDEX "sync_tasks_idempotency_key_idx" ON "sync_tasks" USING btree ("idempotency_key");
  CREATE INDEX "sync_tasks_next_attempt_at_idx" ON "sync_tasks" USING btree ("next_attempt_at");
  CREATE INDEX "sync_tasks_updated_at_idx" ON "sync_tasks" USING btree ("updated_at");
  CREATE INDEX "sync_tasks_created_at_idx" ON "sync_tasks" USING btree ("created_at");
  CREATE INDEX "sync_cursors_organization_idx" ON "sync_cursors" USING btree ("organization_id");
  CREATE INDEX "sync_cursors_name_idx" ON "sync_cursors" USING btree ("name");
  CREATE INDEX "sync_cursors_external_id_idx" ON "sync_cursors" USING btree ("external_id");
  CREATE INDEX "sync_cursors_date_idx" ON "sync_cursors" USING btree ("date");
  CREATE INDEX "sync_cursors_correlation_id_idx" ON "sync_cursors" USING btree ("correlation_id");
  CREATE INDEX "sync_cursors_idempotency_key_idx" ON "sync_cursors" USING btree ("idempotency_key");
  CREATE INDEX "sync_cursors_next_attempt_at_idx" ON "sync_cursors" USING btree ("next_attempt_at");
  CREATE INDEX "sync_cursors_updated_at_idx" ON "sync_cursors" USING btree ("updated_at");
  CREATE INDEX "sync_cursors_created_at_idx" ON "sync_cursors" USING btree ("created_at");
  CREATE INDEX "source_files_organization_idx" ON "source_files" USING btree ("organization_id");
  CREATE INDEX "source_files_name_idx" ON "source_files" USING btree ("name");
  CREATE INDEX "source_files_external_id_idx" ON "source_files" USING btree ("external_id");
  CREATE INDEX "source_files_date_idx" ON "source_files" USING btree ("date");
  CREATE INDEX "source_files_correlation_id_idx" ON "source_files" USING btree ("correlation_id");
  CREATE INDEX "source_files_idempotency_key_idx" ON "source_files" USING btree ("idempotency_key");
  CREATE INDEX "source_files_next_attempt_at_idx" ON "source_files" USING btree ("next_attempt_at");
  CREATE INDEX "source_files_updated_at_idx" ON "source_files" USING btree ("updated_at");
  CREATE INDEX "source_files_created_at_idx" ON "source_files" USING btree ("created_at");
  CREATE INDEX "integration_errors_organization_idx" ON "integration_errors" USING btree ("organization_id");
  CREATE INDEX "integration_errors_name_idx" ON "integration_errors" USING btree ("name");
  CREATE INDEX "integration_errors_external_id_idx" ON "integration_errors" USING btree ("external_id");
  CREATE INDEX "integration_errors_date_idx" ON "integration_errors" USING btree ("date");
  CREATE INDEX "integration_errors_correlation_id_idx" ON "integration_errors" USING btree ("correlation_id");
  CREATE INDEX "integration_errors_idempotency_key_idx" ON "integration_errors" USING btree ("idempotency_key");
  CREATE INDEX "integration_errors_next_attempt_at_idx" ON "integration_errors" USING btree ("next_attempt_at");
  CREATE INDEX "integration_errors_updated_at_idx" ON "integration_errors" USING btree ("updated_at");
  CREATE INDEX "integration_errors_created_at_idx" ON "integration_errors" USING btree ("created_at");
  CREATE INDEX "notifications_organization_idx" ON "notifications" USING btree ("organization_id");
  CREATE INDEX "notifications_name_idx" ON "notifications" USING btree ("name");
  CREATE INDEX "notifications_external_id_idx" ON "notifications" USING btree ("external_id");
  CREATE INDEX "notifications_date_idx" ON "notifications" USING btree ("date");
  CREATE INDEX "notifications_correlation_id_idx" ON "notifications" USING btree ("correlation_id");
  CREATE INDEX "notifications_idempotency_key_idx" ON "notifications" USING btree ("idempotency_key");
  CREATE INDEX "notifications_next_attempt_at_idx" ON "notifications" USING btree ("next_attempt_at");
  CREATE INDEX "notifications_updated_at_idx" ON "notifications" USING btree ("updated_at");
  CREATE INDEX "notifications_created_at_idx" ON "notifications" USING btree ("created_at");
  CREATE INDEX "saved_reports_organization_idx" ON "saved_reports" USING btree ("organization_id");
  CREATE INDEX "saved_reports_name_idx" ON "saved_reports" USING btree ("name");
  CREATE INDEX "saved_reports_external_id_idx" ON "saved_reports" USING btree ("external_id");
  CREATE INDEX "saved_reports_date_idx" ON "saved_reports" USING btree ("date");
  CREATE INDEX "saved_reports_correlation_id_idx" ON "saved_reports" USING btree ("correlation_id");
  CREATE INDEX "saved_reports_idempotency_key_idx" ON "saved_reports" USING btree ("idempotency_key");
  CREATE INDEX "saved_reports_next_attempt_at_idx" ON "saved_reports" USING btree ("next_attempt_at");
  CREATE INDEX "saved_reports_updated_at_idx" ON "saved_reports" USING btree ("updated_at");
  CREATE INDEX "saved_reports_created_at_idx" ON "saved_reports" USING btree ("created_at");
  CREATE INDEX "report_exports_organization_idx" ON "report_exports" USING btree ("organization_id");
  CREATE INDEX "report_exports_name_idx" ON "report_exports" USING btree ("name");
  CREATE INDEX "report_exports_external_id_idx" ON "report_exports" USING btree ("external_id");
  CREATE INDEX "report_exports_date_idx" ON "report_exports" USING btree ("date");
  CREATE INDEX "report_exports_correlation_id_idx" ON "report_exports" USING btree ("correlation_id");
  CREATE INDEX "report_exports_idempotency_key_idx" ON "report_exports" USING btree ("idempotency_key");
  CREATE INDEX "report_exports_next_attempt_at_idx" ON "report_exports" USING btree ("next_attempt_at");
  CREATE INDEX "report_exports_updated_at_idx" ON "report_exports" USING btree ("updated_at");
  CREATE INDEX "report_exports_created_at_idx" ON "report_exports" USING btree ("created_at");
  CREATE INDEX "audit_logs_organization_idx" ON "audit_logs" USING btree ("organization_id");
  CREATE INDEX "audit_logs_name_idx" ON "audit_logs" USING btree ("name");
  CREATE INDEX "audit_logs_external_id_idx" ON "audit_logs" USING btree ("external_id");
  CREATE INDEX "audit_logs_date_idx" ON "audit_logs" USING btree ("date");
  CREATE INDEX "audit_logs_correlation_id_idx" ON "audit_logs" USING btree ("correlation_id");
  CREATE INDEX "audit_logs_idempotency_key_idx" ON "audit_logs" USING btree ("idempotency_key");
  CREATE INDEX "audit_logs_next_attempt_at_idx" ON "audit_logs" USING btree ("next_attempt_at");
  CREATE INDEX "audit_logs_updated_at_idx" ON "audit_logs" USING btree ("updated_at");
  CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");
  CREATE INDEX "media_organization_idx" ON "media" USING btree ("organization_id");
  CREATE INDEX "media_name_idx" ON "media" USING btree ("name");
  CREATE INDEX "media_external_id_idx" ON "media" USING btree ("external_id");
  CREATE INDEX "media_date_idx" ON "media" USING btree ("date");
  CREATE INDEX "media_uploader_idx" ON "media" USING btree ("uploader_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_organizations_id_idx" ON "payload_locked_documents_rels" USING btree ("organizations_id");
  CREATE INDEX "payload_locked_documents_rels_organization_memberships_i_idx" ON "payload_locked_documents_rels" USING btree ("organization_memberships_id");
  CREATE INDEX "payload_locked_documents_rels_organization_invitations_i_idx" ON "payload_locked_documents_rels" USING btree ("organization_invitations_id");
  CREATE INDEX "payload_locked_documents_rels_organization_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("organization_settings_id");
  CREATE INDEX "payload_locked_documents_rels_google_connections_id_idx" ON "payload_locked_documents_rels" USING btree ("google_connections_id");
  CREATE INDEX "payload_locked_documents_rels_google_connection_scopes_i_idx" ON "payload_locked_documents_rels" USING btree ("google_connection_scopes_id");
  CREATE INDEX "payload_locked_documents_rels_play_console_profiles_id_idx" ON "payload_locked_documents_rels" USING btree ("play_console_profiles_id");
  CREATE INDEX "payload_locked_documents_rels_google_ads_accounts_id_idx" ON "payload_locked_documents_rels" USING btree ("google_ads_accounts_id");
  CREATE INDEX "payload_locked_documents_rels_admob_accounts_id_idx" ON "payload_locked_documents_rels" USING btree ("admob_accounts_id");
  CREATE INDEX "payload_locked_documents_rels_apps_id_idx" ON "payload_locked_documents_rels" USING btree ("apps_id");
  CREATE INDEX "payload_locked_documents_rels_google_ads_campaigns_id_idx" ON "payload_locked_documents_rels" USING btree ("google_ads_campaigns_id");
  CREATE INDEX "payload_locked_documents_rels_admob_apps_id_idx" ON "payload_locked_documents_rels" USING btree ("admob_apps_id");
  CREATE INDEX "payload_locked_documents_rels_admob_ad_units_id_idx" ON "payload_locked_documents_rels" USING btree ("admob_ad_units_id");
  CREATE INDEX "payload_locked_documents_rels_campaign_app_mappings_id_idx" ON "payload_locked_documents_rels" USING btree ("campaign_app_mappings_id");
  CREATE INDEX "payload_locked_documents_rels_admob_app_mappings_id_idx" ON "payload_locked_documents_rels" USING btree ("admob_app_mappings_id");
  CREATE INDEX "payload_locked_documents_rels_google_ads_daily_stats_id_idx" ON "payload_locked_documents_rels" USING btree ("google_ads_daily_stats_id");
  CREATE INDEX "payload_locked_documents_rels_admob_daily_stats_id_idx" ON "payload_locked_documents_rels" USING btree ("admob_daily_stats_id");
  CREATE INDEX "payload_locked_documents_rels_play_daily_stats_id_idx" ON "payload_locked_documents_rels" USING btree ("play_daily_stats_id");
  CREATE INDEX "payload_locked_documents_rels_play_financial_transaction_idx" ON "payload_locked_documents_rels" USING btree ("play_financial_transactions_id");
  CREATE INDEX "payload_locked_documents_rels_play_financial_daily_aggre_idx" ON "payload_locked_documents_rels" USING btree ("play_financial_daily_aggregates_id");
  CREATE INDEX "payload_locked_documents_rels_app_daily_financials_id_idx" ON "payload_locked_documents_rels" USING btree ("app_daily_financials_id");
  CREATE INDEX "payload_locked_documents_rels_account_daily_financials_i_idx" ON "payload_locked_documents_rels" USING btree ("account_daily_financials_id");
  CREATE INDEX "payload_locked_documents_rels_organization_daily_financi_idx" ON "payload_locked_documents_rels" USING btree ("organization_daily_financials_id");
  CREATE INDEX "payload_locked_documents_rels_manual_expenses_id_idx" ON "payload_locked_documents_rels" USING btree ("manual_expenses_id");
  CREATE INDEX "payload_locked_documents_rels_expense_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("expense_categories_id");
  CREATE INDEX "payload_locked_documents_rels_expense_allocations_id_idx" ON "payload_locked_documents_rels" USING btree ("expense_allocations_id");
  CREATE INDEX "payload_locked_documents_rels_currency_rates_id_idx" ON "payload_locked_documents_rels" USING btree ("currency_rates_id");
  CREATE INDEX "payload_locked_documents_rels_sync_runs_id_idx" ON "payload_locked_documents_rels" USING btree ("sync_runs_id");
  CREATE INDEX "payload_locked_documents_rels_sync_tasks_id_idx" ON "payload_locked_documents_rels" USING btree ("sync_tasks_id");
  CREATE INDEX "payload_locked_documents_rels_sync_cursors_id_idx" ON "payload_locked_documents_rels" USING btree ("sync_cursors_id");
  CREATE INDEX "payload_locked_documents_rels_source_files_id_idx" ON "payload_locked_documents_rels" USING btree ("source_files_id");
  CREATE INDEX "payload_locked_documents_rels_integration_errors_id_idx" ON "payload_locked_documents_rels" USING btree ("integration_errors_id");
  CREATE INDEX "payload_locked_documents_rels_notifications_id_idx" ON "payload_locked_documents_rels" USING btree ("notifications_id");
  CREATE INDEX "payload_locked_documents_rels_saved_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("saved_reports_id");
  CREATE INDEX "payload_locked_documents_rels_report_exports_id_idx" ON "payload_locked_documents_rels" USING btree ("report_exports_id");
  CREATE INDEX "payload_locked_documents_rels_audit_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_logs_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "organizations" CASCADE;
  DROP TABLE "organization_memberships" CASCADE;
  DROP TABLE "organization_invitations" CASCADE;
  DROP TABLE "organization_settings" CASCADE;
  DROP TABLE "google_connections" CASCADE;
  DROP TABLE "google_connection_scopes" CASCADE;
  DROP TABLE "play_console_profiles" CASCADE;
  DROP TABLE "google_ads_accounts" CASCADE;
  DROP TABLE "admob_accounts" CASCADE;
  DROP TABLE "apps" CASCADE;
  DROP TABLE "google_ads_campaigns" CASCADE;
  DROP TABLE "admob_apps" CASCADE;
  DROP TABLE "admob_ad_units" CASCADE;
  DROP TABLE "campaign_app_mappings" CASCADE;
  DROP TABLE "admob_app_mappings" CASCADE;
  DROP TABLE "google_ads_daily_stats" CASCADE;
  DROP TABLE "admob_daily_stats" CASCADE;
  DROP TABLE "play_daily_stats" CASCADE;
  DROP TABLE "play_financial_transactions" CASCADE;
  DROP TABLE "play_financial_daily_aggregates" CASCADE;
  DROP TABLE "app_daily_financials" CASCADE;
  DROP TABLE "account_daily_financials" CASCADE;
  DROP TABLE "organization_daily_financials" CASCADE;
  DROP TABLE "manual_expenses" CASCADE;
  DROP TABLE "expense_categories" CASCADE;
  DROP TABLE "expense_allocations" CASCADE;
  DROP TABLE "currency_rates" CASCADE;
  DROP TABLE "sync_runs" CASCADE;
  DROP TABLE "sync_tasks" CASCADE;
  DROP TABLE "sync_cursors" CASCADE;
  DROP TABLE "source_files" CASCADE;
  DROP TABLE "integration_errors" CASCADE;
  DROP TABLE "notifications" CASCADE;
  DROP TABLE "saved_reports" CASCADE;
  DROP TABLE "report_exports" CASCADE;
  DROP TABLE "audit_logs" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_platform_role";
  DROP TYPE "public"."enum_organization_memberships_role";
  DROP TYPE "public"."enum_organization_memberships_status";
  DROP TYPE "public"."enum_organization_invitations_status";
  DROP TYPE "public"."enum_organization_invitations_role";
  DROP TYPE "public"."enum_organization_settings_status";
  DROP TYPE "public"."enum_google_connections_status";
  DROP TYPE "public"."enum_google_connection_scopes_status";
  DROP TYPE "public"."enum_play_console_profiles_status";
  DROP TYPE "public"."enum_google_ads_accounts_status";
  DROP TYPE "public"."enum_admob_accounts_status";
  DROP TYPE "public"."enum_apps_status";
  DROP TYPE "public"."enum_google_ads_campaigns_status";
  DROP TYPE "public"."enum_admob_apps_status";
  DROP TYPE "public"."enum_admob_ad_units_status";
  DROP TYPE "public"."enum_campaign_app_mappings_status";
  DROP TYPE "public"."enum_campaign_app_mappings_mapping_method";
  DROP TYPE "public"."enum_admob_app_mappings_status";
  DROP TYPE "public"."enum_admob_app_mappings_mapping_method";
  DROP TYPE "public"."enum_google_ads_daily_stats_status";
  DROP TYPE "public"."enum_admob_daily_stats_status";
  DROP TYPE "public"."enum_play_daily_stats_status";
  DROP TYPE "public"."enum_play_financial_transactions_status";
  DROP TYPE "public"."enum_play_financial_daily_aggregates_status";
  DROP TYPE "public"."enum_app_daily_financials_status";
  DROP TYPE "public"."enum_account_daily_financials_status";
  DROP TYPE "public"."enum_organization_daily_financials_status";
  DROP TYPE "public"."enum_manual_expenses_status";
  DROP TYPE "public"."enum_manual_expenses_allocation_method";
  DROP TYPE "public"."enum_expense_categories_status";
  DROP TYPE "public"."enum_expense_allocations_status";
  DROP TYPE "public"."enum_currency_rates_status";
  DROP TYPE "public"."enum_sync_runs_status";
  DROP TYPE "public"."enum_sync_tasks_status";
  DROP TYPE "public"."enum_sync_cursors_status";
  DROP TYPE "public"."enum_source_files_status";
  DROP TYPE "public"."enum_integration_errors_status";
  DROP TYPE "public"."enum_notifications_status";
  DROP TYPE "public"."enum_saved_reports_status";
  DROP TYPE "public"."enum_report_exports_status";
  DROP TYPE "public"."enum_audit_logs_status";
  DROP TYPE "public"."enum_media_status";`)
}
