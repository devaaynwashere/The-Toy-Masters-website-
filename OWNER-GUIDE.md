# The Toy Masters — owner guide

## Your website

The site has a toy catalogue, search and filters, individual product pages, makers-market information, custom requests, a gift guide, care and safety information, and a private owner dashboard. There is no online checkout. All prices are AUD.

The first catalogue contains 26 demo products. Replace their details and photos and confirm their age guidance before public launch. The hero is labelled illustrative artwork. No market date, stall number, social handle or customer review has been invented.

## Open Admin

Visit your website and add `/admin` to the address. Sign in using your configured password. Admin is deliberately absent from the public navigation. Sessions last eight hours. Use **Logout** when finished.

The requested initial password has been configured privately in hosting. It is not included in the website source or sent to visitors. Change it to a longer unique password before opening the site to the public.

To change it, update the hosting secret named **ADMIN_PASSWORD**, then republish the site. You can ask Codex to do this for you. Changing the password invalidates existing admin sessions. For local development only, put `ADMIN_PASSWORD=<your password>` in the ignored `.dev.vars` file (the built local server reads this from its configuration directory). Never share or commit that file.

## Add a product

1. Open **Products**, then **Add product**.
2. Enter the name, price and category. The URL slug fills automatically for a new product.
3. Press **Upload photos** and select one or several JPG, PNG or WebP files from your phone or computer. On a computer you can also drag files into the upload area.
4. Add a short description, product type, size, age guidance, material, colours and stock status. Write care and safety information for this specific product.
5. Turn **Published** on and press **Save changes**. Wait for **Changes saved**.

The product is now in the public catalogue. Turn Published off to hide it. **Delete listing** removes the product from the catalogue and the normal Admin list. It keeps an archived copy, its photos and existing enquiries. Enable **Show archived listings** and choose **Restore** to recover it as a hidden draft. **Duplicate** makes an unpublished copy for a similar product.

## Photos, cover images and video

The first photo is the cover. Use **Make cover**, **Move up** and **Move down** to arrange photos. Each photo has an ALT text box: describe what it shows for people using screen readers. Use **Replace photo** to choose a new file, or **Remove** to detach it from this product. Removing it does not immediately delete it from the library.

Phones use their normal photo picker. If your phone offers an unsupported format such as HEIC, export it as JPG first. Photos are resized and converted to WebP when the browser supports it; the server verifies the uploaded format and size. You can reuse uploaded photos from the library picker. Product videos are optional: upload an MP4 of up to 25 MB or provide a direct HTTPS video-file URL. Social-page URLs are not embedded video files.

## Colours and prices

Press **Add colour**, enter its name, choose a preview colour and optionally associate a product photo. Add as many options as needed.

To change a price, open **Products → Edit**, change **Price (AUD)** and save. That single saved price updates the homepage, shop, search, product page, gift guide and market listings. Optional sale and bundle prices are also available. A sale price cannot be higher than the normal price.

Turn **New** on for New Arrivals, **Featured** on for the featured homepage section, and **Market pick** on for its badge. **Available at market** enables the shop’s market-availability filter. The products assigned to a particular market are selected separately in that market’s editor.

## Categories

Open **Categories** to add or rename a category, choose an icon, upload its image, change its order or hide it. A hidden category also hides its products from public browsing. Lower display-order numbers come first.

## Markets

1. Open **Markets → Add market**.
2. Enter the actual date, start/end times, venue and address.
3. Leave the stall number blank until it is confirmed. Add it later and save.
4. Tick the products you are bringing. Add offers one per line and optionally upload stall photos.
5. Set **Confirmed** only when you have a confirmed date and times, then save.

The nearest confirmed upcoming market automatically appears across the site and in pickup forms. Pending and cancelled events are excluded from the next-market choice. Mark an event **Completed** when finished, or cancel it if plans change. Existing customer requests are retained.

## Customer messages

- **Custom Orders** holds ideas, colours, sizes, requested dates and private reference images. Update the status as work progresses.
- **Reservations** holds requested products, colours, quantities and pickup markets. A request is not confirmed until you contact the customer and update its status.
- **Contact Messages** holds general and product enquiries. Mark messages Read, Replied or Archived as appropriate.

Click a customer’s email to reply using your email application. Forms store requests in the dashboard. Automatic email notifications are not configured; check the dashboard regularly.

## Site settings

Use **Site Settings** for your contact email, social-page URLs, location, announcement, brand wording, business story, maker introduction, community text and transport information. Leave unknown contact details blank. Only add genuine reviews with permission.

## Saving

Press **Save changes** and wait for confirmation before leaving. If a save fails, your edits stay on screen so you can correct them and retry. The dashboard asks before discarding unsaved edits, and the browser warns when closing a page with unsaved product, category, market or settings changes.

## Storage and backups

The hosted database uses Cloudflare D1. Uploaded photos, videos and private references use Cloudflare R2 object storage. They are separate from the website code and survive redeployment. Local test data does not get copied into the live database.

Use **Dashboard → Download database backup** regularly. This downloads a JSON copy of products, categories, markets, settings, messages and media metadata. Keep it in a private place because it includes customer details. It does not include the actual photo/video bytes: download those from **Media Library** and keep copies of original photos separately. R2 files can also be backed up using the hosting provider’s supported storage export tools. D1 supports provider backup/recovery features; check the hosting account’s available access and retention before relying on them. A one-click restore interface is not included.

## Publishing

Codex publishes source changes through the Sites hosting workflow. Ask it to update and republish this existing site. Product, category, market and settings edits saved in Admin are live immediately and do not require a code deployment.

This initial site is owner-private. To launch it publicly, explicitly request public access after reviewing your real product information, contact details, safety guidance and business policies. Private access is useful while you prepare the catalogue.

## Still needed before public launch

- Real product photos, final prices, dimensions, stock and colour options.
- Product-specific age and safety guidance, including any required testing or compliance review.
- Your contact email and actual social-page URLs.
- Confirmed market dates, times, stalls, selected products and genuine deals.
- Your maker introduction, stall photos and printing timelapses.
- Final privacy terms, data-retention decisions, and sales/cancellation/refund policies.
- Your preferred domain, a stronger admin password and an explicit decision to make the site public.

The blog currently has an honest empty state rather than fabricated posts. Publishing a new blog article requires a site content update; a blog editor is not included in this first dashboard.
