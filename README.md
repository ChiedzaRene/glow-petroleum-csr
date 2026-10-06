# Glow Petroleum – CSR page redesign

## What's in this folder

| Folder | What it is |
|---|---|
| `mockups/` | Screenshots of the new page on desktop and mobile (hero, Sports & Culture, Academic, Community, full page) |
| `html-version/` | Stand-alone **HTML + CSS + JS** (`index.html`, `csr.css`, `csr.js`, `images/`). Open `index.html` in a browser to preview it. |
| `wordpress-version/option-1-custom-html-block.html` | **WordPress option 1**: the whole page in a single paste |
| `wordpress-version/option-2-gutenberg-blocks.txt` | **WordPress option 2**: built from normal WordPress blocks (Gallery, Group, Columns, Image, Heading, Buttons), so the text and photos can be edited visually |
| `wordpress-version/glow-wp-blocks.css` / `.js` | The styling and slideshow script for option 2 (already included inside the .txt file; the separate copies are for anyone who prefers to put them in the theme) |

**Page structure:** a full-width hero slideshow (fading photos, progress dots, arrows and swipe on phones), an intro with stats, a sticky pillar menu, and then three sections:
1. **Sports & Culture:** Golf, Netball, Tug of War cards
2. **Academic:** MSAA feature
3. **Community:** photo gallery (click to enlarge in the HTML version) and impact cards

The page ends with a "Get in touch" call-to-action band.

> ⚠️ The images are **illustrated placeholders**. Replace them with your real event photos. Check all text (especially the MSAA description and the stats) against your facts before publishing.

---

## WordPress option 1: one Custom HTML block (fastest)

Use this when you want the page to look exactly like the mockups.

1. **Media → Add New.** Upload your photos: 5 for the hero slideshow, 3 for the sports cards, 1–2 for MSAA, 3 for community. Landscape photos at about 1600×900 work best.
2. Open each photo and click **Copy URL to clipboard**.
3. Open `option-1-custom-html-block.html` and replace each `/wp-content/uploads/CHANGE-ME/xxx.svg` with the matching photo URL.
4. **Pages → Our Corporate Social Responsibility → Edit.** Delete the old content and add a **Custom HTML** block. Paste the whole file into it.
5. In the page settings sidebar, set **Template** to *Full width* / *No sidebar* (the name depends on your theme). Then **Update**.

To add a hero slide, copy one `<div class="gc-slide">…</div>` block and change the image and caption. To change the brand colours, edit the `--glow-orange`, `--glow-yellow` and related variables at the top of the `<style>`.

## WordPress option 2: native WordPress blocks (easiest to maintain)

Use this when your team should be able to swap photos and edit text without touching code.

1. Edit the page, open the **⋮ menu (top right) → Code editor**, paste all of `option-2-gutenberg-blocks.txt`, then click **Exit code editor**.
2. Every section is now a normal block you can click and edit:
   * **Hero slideshow** = the Gallery block at the top. Click it, then use **Add** or **Replace** to manage the slideshow photos.
   * **Sports cards** = three columns, each with an Image, a Heading and a Paragraph.
   * **MSAA** = Columns with an Image, a List and a Button.
   * **Community** = Image blocks with captions, plus three impact cards.
3. The first block (Custom HTML) holds the styles and the last one holds the slideshow script. Leave both in place.
   *Tidier alternative:* paste `glow-wp-blocks.css` into **Appearance → Customize → Additional CSS** and put `glow-wp-blocks.js` in a footer snippet (for example with the free **WPCode** plugin). Then delete those two Custom HTML blocks.
4. The design depends on the **Advanced → Additional CSS class(es)** values (`glow-hero`, `glow-card glow-card--golf`, etc.). Keep them when you edit or duplicate blocks.

If WordPress says *"This block contains unexpected or invalid content"* on any block, click **Attempt Block Recovery**. Small differences between WordPress versions can cause this.

## If the site uses Elementor

You can build the same layout with Elementor widgets (Free unless marked Pro):

| Section | Elementor build |
|---|---|
| Hero slideshow | **Slides** widget (Pro): one slide per photo, with heading, text and button on each, *Ken Burns* effect on, autoplay 6s. On Elementor Free, use a Container with the **Background → Slideshow** option (add photos, Ken Burns on) and put the Heading, Text and Buttons inside it. |
| Intro + stats | Container → Heading + Text Editor, then a 4-column Container of **Counter** widgets |
| Pillar menu | Container with three **Button** widgets linking to `#gc-sport`, `#gc-academic`, `#gc-community`. Set Motion Effects → **Sticky: Top** (Pro), or skip it. |
| Sports & Culture | Set the section's CSS ID to `gc-sport`. 3-column Container with an **Image Box** or **Call to Action** widget (Pro) per sport. Hover animation: *Grow*. |
| Academic – MSAA | ID `gc-academic`, dark navy background. 2 columns: **Image** on one side; Heading, Text, **Icon List** (✓ icons) and a Button on the other |
| Community | ID `gc-community`. **Basic Gallery** or **Gallery** (Pro, masonry with lightbox), then 3 **Icon Box** widgets |
| CTA | Container with an orange→yellow gradient background, Heading and Button |

For the brand colours, set **Site Settings → Global Colors**: Primary `#f26b1d`, Secondary `#ffc23d`, Text `#1b2236`, Accent `#0f1d3a`. Use *Poppins* for text and *Montserrat* for headings, and turn on **Entrance Animation: Fade In Up** for each section.
