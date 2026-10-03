CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`image` text DEFAULT '' NOT NULL,
	`icon` text DEFAULT 'Sparkles' NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`hidden` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product_colours` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`name` text NOT NULL,
	`hex` text DEFAULT '' NOT NULL,
	`photo` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`status` text NOT NULL,
	`data` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product_images` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`media_id` text,
	`url` text NOT NULL,
	`alt` text NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`reset` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `market_deals` (
	`id` text PRIMARY KEY NOT NULL,
	`market_id` text NOT NULL,
	`label` text NOT NULL,
	FOREIGN KEY (`market_id`) REFERENCES `markets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `market_products` (
	`market_id` text NOT NULL,
	`product_id` text NOT NULL,
	PRIMARY KEY(`market_id`, `product_id`),
	FOREIGN KEY (`market_id`) REFERENCES `markets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `markets` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`date` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'Pending' NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`name` text NOT NULL,
	`mime` text NOT NULL,
	`size` integer NOT NULL,
	`private` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `media_key_unique` ON `media` (`key`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`category_id` text NOT NULL,
	`price` real NOT NULL,
	`published` integer DEFAULT 0 NOT NULL,
	`archived` integer DEFAULT 0 NOT NULL,
	`data` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`hash` text PRIMARY KEY NOT NULL,
	`expires` integer NOT NULL,
	`password_version` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL
);
