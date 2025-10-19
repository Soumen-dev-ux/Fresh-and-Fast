-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  total_price INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table (junction table for orders and menu items)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES menu_items(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price_at_purchase INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);

-- Seed menu items
INSERT INTO menu_items (name, description, price, category, image_url) VALUES
('Grilled Chicken Salad', 'Fresh greens with grilled chicken, cherry tomatoes, and house dressing', 349, 'Salads', '/grilled-chicken-salad.jpg'),
('Caesar Salad', 'Crisp romaine, parmesan, croutons, and creamy Caesar dressing', 299, 'Salads', '/caesar-salad.png'),
('Mediterranean Salad', 'Mixed greens, feta, olives, cucumbers, and olive oil vinaigrette', 379, 'Salads', '/mediterranean-salad.jpg'),
('Veggie Power Bowl', 'Quinoa, roasted vegetables, chickpeas, and tahini dressing', 279, 'Bowls', '/veggie-power-bowl.jpg'),
('Salmon Poke Bowl', 'Sushi-grade salmon, rice, avocado, cucumber, and spicy mayo', 399, 'Bowls', '/salmon-poke-bowl.jpg'),
('Teriyaki Chicken Bowl', 'Grilled chicken, brown rice, broccoli, carrots, and teriyaki glaze', 349, 'Bowls', '/teriyaki-chicken-bowl.jpg'),
('Buddha Bowl', 'Roasted sweet potato, kale, chickpeas, tahini dressing', 329, 'Bowls', '/buddha-bowl.jpg'),
('Turkey Wrap', 'Sliced turkey, lettuce, tomato, and cranberry sauce in a whole wheat wrap', 249, 'Wraps & Sandwiches', '/turkey-wrap.jpg'),
('Veggie Wrap', 'Hummus, roasted vegetables, spinach, and feta in a spinach wrap', 219, 'Wraps & Sandwiches', '/veggie-wrap.jpg'),
('Grilled Chicken Sandwich', 'Grilled chicken breast, avocado, bacon, and chipotle mayo on sourdough', 279, 'Wraps & Sandwiches', '/grilled-chicken-sandwich.jpg'),
('Falafel Plate', 'Crispy falafel, hummus, pita bread, and fresh vegetables', 299, 'Vegetarian', '/falafel-plate.jpg'),
('Veggie Burger', 'Plant-based patty, lettuce, tomato, pickles, and vegan mayo', 279, 'Vegetarian', '/veggie-burger.jpg'),
('Acai Bowl', 'Acai berry base with granola, coconut, and fresh berries', 229, 'Breakfast', '/acai-bowl.jpg'),
('Protein Pancakes', 'Fluffy pancakes with protein powder, berries, and Greek yogurt', 249, 'Breakfast', '/protein-pancakes.jpg');
