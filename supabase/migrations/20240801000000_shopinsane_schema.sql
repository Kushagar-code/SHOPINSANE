-- Migration: Initialize Shopinsane MVP Schema
-- Description: Core tables, RLS policies, and configurations based on BACKEND_STRUCTURE.md

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-------------------------------------------------------------------------------
-- 1. Profiles Table
-------------------------------------------------------------------------------
create table public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    email varchar(255) not null unique,
    full_name varchar(255),
    avatar_url varchar(255),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- RLS
alter table public.profiles enable row level security;
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-------------------------------------------------------------------------------
-- 2. Categories Table
-------------------------------------------------------------------------------
create table public.categories (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null unique,
    slug varchar(255) not null unique,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- RLS
alter table public.categories enable row level security;
create policy "Categories are publicly viewable" on public.categories for select using (true);

-------------------------------------------------------------------------------
-- 3. Products Table
-------------------------------------------------------------------------------
create table public.products (
    id uuid primary key default gen_random_uuid(),
    category_id uuid references public.categories(id) on delete set null,
    name varchar(255) not null,
    slug varchar(255) not null unique,
    description text not null,
    price numeric(10,2) not null check (price >= 0),
    image_url varchar(512) not null,
    inventory_count integer not null default 0 check (inventory_count >= 0),
    tags text[],
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index products_tags_idx on public.products using gin (tags);

-- RLS
alter table public.products enable row level security;
create policy "Products are publicly viewable" on public.products for select using (true);

-------------------------------------------------------------------------------
-- 4. Carts Table
-------------------------------------------------------------------------------
create table public.carts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id) on delete cascade,
    session_token varchar(255) unique,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- RLS
alter table public.carts enable row level security;
create policy "Users can manage their own cart" on public.carts
  for all using (auth.uid() = user_id or session_token = current_setting('request.jwt.claims', true)::json->>'session_id');

-------------------------------------------------------------------------------
-- 5. Cart Items Table
-------------------------------------------------------------------------------
create table public.cart_items (
    id uuid primary key default gen_random_uuid(),
    cart_id uuid not null references public.carts(id) on delete cascade,
    product_id uuid not null references public.products(id) on delete cascade,
    quantity integer not null default 1 check (quantity > 0),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(cart_id, product_id)
);

-- RLS
alter table public.cart_items enable row level security;
create policy "Users can manage items in their carts" on public.cart_items
  for all using (
    exists (
      select 1 from public.carts
      where carts.id = cart_items.cart_id
      and (carts.user_id = auth.uid() or carts.session_token = current_setting('request.jwt.claims', true)::json->>'session_id')
    )
  );

-------------------------------------------------------------------------------
-- 6. Orders Table
-------------------------------------------------------------------------------
create table public.orders (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    status varchar(50) not null default 'Ordered' check (status in ('Ordered', 'Processing', 'Shipped', 'Delivered')),
    total_amount numeric(10,2) not null check (total_amount >= 0),
    shipping_address jsonb not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index orders_status_idx on public.orders(status);

-- RLS
alter table public.orders enable row level security;
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can create own orders" on public.orders for insert with check (auth.uid() = user_id);

-------------------------------------------------------------------------------
-- 7. Order Items Table
-------------------------------------------------------------------------------
create table public.order_items (
    id uuid primary key default gen_random_uuid(),
    order_id uuid not null references public.orders(id) on delete cascade,
    product_id uuid not null references public.products(id) on delete set null,
    price_at_purchase numeric(10,2) not null check (price_at_purchase >= 0),
    quantity integer not null check (quantity > 0),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- RLS
alter table public.order_items enable row level security;
create policy "Users can view own order items" on public.order_items for select using (
    exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Users can create own order items" on public.order_items for insert with check (
    exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);

-------------------------------------------------------------------------------
-- Triggers for updated_at
-------------------------------------------------------------------------------
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on public.profiles for each row execute function update_updated_at_column();
create trigger update_categories_updated_at before update on public.categories for each row execute function update_updated_at_column();
create trigger update_products_updated_at before update on public.products for each row execute function update_updated_at_column();
create trigger update_carts_updated_at before update on public.carts for each row execute function update_updated_at_column();
create trigger update_cart_items_updated_at before update on public.cart_items for each row execute function update_updated_at_column();
create trigger update_orders_updated_at before update on public.orders for each row execute function update_updated_at_column();
create trigger update_order_items_updated_at before update on public.order_items for each row execute function update_updated_at_column();
