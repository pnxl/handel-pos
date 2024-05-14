# Handel

This is Handel - a web-based, simple, configurable point-of-sale app. It's aimed towards people running small, temporary businesses - such as garage sales and pop-up shops.

### It makes running your shop effortless, with features such as...
- **Calculating item prices on the fly**, and gives you a live preview of the current order's price 💸 
- **Item modifier management**, so you can add modifiers to an item, such as it's sauces, flavour, and size 🤖
- **Dead simple order logging**, to keep track of every item you've ever sold; making it easy to see who sold what, how much you earned, and when it was sold 📜

### Furthermore, Handel is based around core fundamentals that matter...
- Firstly, it's **So. Damn. Simple.** it's designed with ease-of-use in mind, so prioritises a clear and straightforward design. This minimises the learning curve and helps you focus on selling items 🤑
- For all the nerds, it's **built on rock solid foundations**, taking advantage of the latest technologies in order to stay performant and fast ⚡️ 
- Lastly, it's **infinitely customisable**. Because of its open source nature, anyone is free to fork it and adjust it to their own needs 😄

### What applications can it be used for?

Handel can be applied to a lot of scenarios, such as..

- Garage sales (can be used to keep track of prices and inventory\*)
- Pop-up shops (maybe something temporary, like selling lemonade at the side of the street)
- School projects (something like 'Entrepreneurship Day' where you sell goods)

* feature coming soon!

### What's the catch?

Handel doesn't take payments - instead having you handle the payments manually. This is perfect for small temporary shops, where obtaining a payment terminal or a real register isn't viable.

## How do I use it?

To get started with Handel, fork the project and run your own instance on Cloudflare Pages (or any other static hosting service). Make sure to fill your enviroment variables accordingly (refer to `.env.example`)

### Database setup

You'll also need a Supabase instance, with tables for the following:
1. Items, to store all your items
2. Users, for logging who sold what (optional)
3. History, to log items you've sold (optional)

You'll also need two storage buckets, for the following:
1. Items, to store images of items you're selling.
2. Users, to store images of the cashiers (required if you have the users database)

You can name them any of these anything you'd like. Enter the names in your environment variables (refer to `.env.example`)

For columns in the table, you'll need the following:
- For the items table:
  - id (int8, leave default)
  - name (text)
  - price (float4)
  - image (text, default value: `noimage.png`)
  - description (text)
  - options (jsonb, array, default value: `[]`)

- For the users table:
  - fullName (text)
  - image (text, default value: `noimage.png`)

- For the history table:
  - id (int8, leave default)
  - timestamp (timestamptz, leave default)
  - profit (float4)
  - cashier (text, default value: `Cashier`)
  - name (text)
  - options (text, array, default value: `[]`)
 
### Adding new items
Create a new column in your items table and fill in each row accordingly.

#### Adding images to items
Upload an image of your item to your items storage bucket, taking note of the name. Go back to the table editor, and fill in the image row with the file name of the image you just uploaded.

#### Adding options to items
Each item has the ability to have modifiers and modifier categories (such as size, add-ons, etc.) in a JSON array. The syntax goes as follows:
```json
[
  {
    "category": "Add-ons"
    "items": [
      {
        "name": "Add-on #1",
        "price": 0
      },
      {
        "name": "Add-on #2",
        "price": 3
      },
      {
        "name": "Add-on #3",
        "price": 6
      }
    ]
  },
  {
    "category": "Modifier",
    "items": [
      {
        "name": "Modifier #1",
        "price": 0
      },
      {
        "name": "Modifier #2",
        "price": 0
      },
      {
        "name": "Modifier #3",
        "price": 0
      }
    ]
  }
]
```

### Adding new users
Create a new column in your users table and fill in each row accordingly.

#### Adding images to items
Upload an image of your item to your users storage bucket, taking note of the name. Go back to the table editor, and fill in the image row with the file name of the image you just uploaded.

### Does that sound good to you?
If it does - you can learn more about it at [handel.pnxl.dev](https://handel.pnxl.dev/).

For demos, check out [handel-demo.pages.dev](https://handel-demo.pages.dev).

For an in-person demo and to get it for your business, feel free to contact me here or through email at [jason@pnxl.dev](mailto:jason@pnxl.dev); I'd love to show you what my product can do for your business 😉

## Acknowledgements and Credits

Much love to Nuxt for a rock solid framework and Supabase for an easy-to-use database. ❤

Code licensed under GNU GPLv2.

Assets and libraries used with permission.
