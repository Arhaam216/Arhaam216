# Design Specification: Interactive Islamic Bookshelf

## 1. 3D Environment & Core Mechanics

### 1.1. 3D Engine and Performance
- **Engine:** The application will be built using a high-performance 3D web engine, such as **Three.js** or **Babylon.js**, to ensure smooth rendering and interaction.
- **Performance:** The application will be optimized for performance by using techniques such as Level of Detail (LOD) for models, texture compression, and efficient rendering loops.

### 1.2. Bookshelf Customization
- **Bookshelf Models:** Users will be able to choose from a variety of pre-designed bookshelf models, including:
    - Standard Library Shelf
    - Cabinet with Doors
    - Bookshelf with Drawers
    - Simple Modern Shelf
- **Placement:** Users can drag and drop bookshelves into the 3D scene. They can be rotated and positioned freely.

### 1.3. Realistic Physics
- **Physics Engine:** A lightweight physics engine (e.g., **Ammo.js** or **Cannon.js**) will be integrated to handle realistic physics.
- **Gravitation:** Books will be affected by gravity, causing them to fall and stack realistically when placed on shelves or dropped.
- **Collision Detection:** The physics engine will handle collision detection between books and other objects in the scene.

### 1.4. Movement & Placement SFX
- **Sound Library:** A JavaScript sound library (e.g., **Howler.js**) will be used to manage audio playback.
- **Sound Events:**
    - `bookmove.mp3`: Triggered when a book is picked up or moved.
    - `bookfall.mp3`: Triggered when a book collides with another object with sufficient force.

### 1.5. Book Metadata Display
- **Tooltip:** A subtle, non-intrusive tooltip will appear when the user's cursor hovers over a book.
- **Information:** The tooltip will display the book's **Title** and **Author**.

### 1.6. Virtual Desk/Reading Area
- **Desk Object:** A virtual desk object can be placed in the scene.
- **Reading Mode:** When a book is opened, it will be displayed on the desk, providing a dedicated reading area.

## 2. Book Management & Content

### 2.1. Supported Formats
- **PDF:** A robust PDF rendering library (e.g., **PDF.js**) will be used to display PDF content.
- **TXT:** Plain text files will be rendered in a simple, readable format.
- **Image Gallery:** For comics and magazines, a sequence of images will be displayed in a gallery format.
- **Word (.docx/.doc):** A client-side library (e.g., **Mammoth.js**) will be used to convert Word documents to HTML for display.

### 2.2. Book Model Customization
- **User Interface:** A dedicated UI will be provided for adding and customizing books.
- **Properties:**
    - **Fatness/Thickness:** A slider to control the thickness of the book model.
    - **Cover Pages:** Users can upload images for the front and back covers.
    - **Spine Texture:** Users can upload an image for the spine of the book.

### 2.3. Book Creation
- **Text Editor:** A simple in-app text editor will be provided for creating new books.
- **Content:** The content will be saved in a `.txt` format.
- **Customization:** Users can set the thickness, cover, and spine for the new book.

### 2.4. Organization & Search
- **Tagging/Categorization:** Users can add tags (e.g., Fiqh, Hadith, Seerah) to books.
- **Search:** A search bar will be provided to search for books by title, author, or tags.
- **Filtering:** The search results will filter the books in the 3D scene, highlighting the matching books.

## 3. Reading Experience & Interactivity

### 3.1. Access & Viewing
- **Double-Click:** Double-clicking on a book in the 3D scene will open it in the reading view.

### 3.2. PDF Viewer Fidelity
- **Side-by-Side Pages:** The PDF viewer will display two pages side-by-side, simulating an open book.
- **Page Turning:** A realistic page-turning animation will be implemented, accompanied by a `sound.mp3` sound effect.

### 3.3. Reading Tools
- **Magnifying Glass:** A toggleable magnifying glass tool for zooming in on text.
- **Highlighter and Pen:**
    - **Highlighter:** Users can highlight text in different colors.
    - **Pen:** Users can draw freehand annotations on the pages.
- **Bookmark:** A feature to save the current page of a book.
- **Notebook:** A separate, persistent virtual notebook for general notes.
- **Save Page:** An option to export the current page as an image or a separate note.

### 3.4. Visual Atmosphere
- **Dynamic Lighting:** The scene will have a dynamic lighting system.
- **Night Mode:** A "Night Mode" will be available, with softer lighting.
- **Reading Lamp:** A virtual reading lamp object can be placed on the desk to illuminate the reading area.

### 3.5. Ambient Soundscape
- **Background Sounds:** Users can toggle a background ambient soundscape (e.g., quiet rain, library rustling).

## 4. Progress Persistence & Safety

### 4.1. Save Progress
- **Local Storage:** The state of the library (shelf layout, book positions, reading progress, annotations) will be saved in the browser's local storage.
- **Cloud Storage (Optional):** For registered users, the state can be saved to a cloud database (e.g., Firebase, AWS S3).

### 4.2. Exit Alert
- **Unsaved Changes:** An alert will be triggered if the user attempts to leave the website with unsaved changes.

## 5. Technology Stack

- **3D Engine:** Three.js or Babylon.js
- **Physics Engine:** Ammo.js or Cannon.js
- **Sound Library:** Howler.js
- **PDF Viewer:** PDF.js
- **Word Document Converter:** Mammoth.js
- **Frontend Framework (Optional):** React, Vue, or Svelte for building the UI components.
- **Backend (Optional):** Node.js with Express for user authentication and cloud storage.
- **Database (Optional):** MongoDB or PostgreSQL for storing user data.
