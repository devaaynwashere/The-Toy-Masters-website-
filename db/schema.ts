// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer, real, primaryKey } from 'drizzle-orm/sqlite-core';
export const categories = sqliteTable('categories', { id:text().primaryKey(), name:text().notNull(), image:text().notNull().default(''), icon:text().notNull().default('Sparkles'), position:integer().notNull().default(0), hidden:integer().notNull().default(0) });
export const products = sqliteTable('products', { id:text().primaryKey(), slug:text().notNull().unique(), name:text().notNull(), categoryId:text('category_id').references(()=>categories.id).notNull(), price:real().notNull(), published:integer().notNull().default(0), archived:integer().notNull().default(0), data:text().notNull(), createdAt:text('created_at').notNull(), updatedAt:text('updated_at').notNull() });
export const images = sqliteTable('product_images', { id:text().primaryKey(), productId:text('product_id').references(()=>products.id).notNull(), mediaId:text('media_id'), url:text().notNull(), alt:text().notNull(), position:integer().notNull().default(0) });
export const colours = sqliteTable('product_colours', { id:text().primaryKey(), productId:text('product_id').references(()=>products.id).notNull(), name:text().notNull(), hex:text().notNull().default(''), photo:text().notNull().default('') });
export const markets = sqliteTable('markets', { id:text().primaryKey(), name:text().notNull(), date:text().notNull().default(''), status:text().notNull().default('Pending'), data:text().notNull() });
export const marketProducts = sqliteTable('market_products',{marketId:text('market_id').references(()=>markets.id).notNull(),productId:text('product_id').references(()=>products.id).notNull()},t=>[primaryKey({columns:[t.marketId,t.productId]})]);
export const marketDeals = sqliteTable('market_deals',{id:text().primaryKey(),marketId:text('market_id').references(()=>markets.id).notNull(),label:text().notNull()});
export const enquiries = sqliteTable('enquiries',{id:text().primaryKey(),kind:text().notNull(),name:text().notNull(),email:text().notNull(),status:text().notNull(),data:text().notNull(),createdAt:text('created_at').notNull()});
export const settings = sqliteTable('site_settings',{id:text().primaryKey(),data:text().notNull()});
export const media = sqliteTable('media',{id:text().primaryKey(),key:text().notNull().unique(),name:text().notNull(),mime:text().notNull(),size:integer().notNull(),private:integer().notNull().default(0),createdAt:text('created_at').notNull()});
export const sessions = sqliteTable('sessions',{hash:text().primaryKey(),expires:integer().notNull(),passwordVersion:text('password_version').notNull()});
export const limits = sqliteTable('rate_limits',{key:text().primaryKey(),count:integer().notNull(),reset:integer().notNull()});
