
# Domingoo

Domingoo is a web-based design and layout tool inspired by Figma.  
It allows users to create, edit, and manage elements like rectangles and text on a canvas, along with layer management and properties editing.

---

## 🚀 Features

### ✅ Canvas & Drawing
- Draw rectangles by selecting the **Rectangle tool**
- Add text by selecting the **Text tool**
- Click and drag to place and size elements
- Move elements using the **Move tool**

### 🧩 Layers Panel
- Shows all elements added to the canvas
- Each layer can be:
  - Selected
  - Hidden/Unhidden
  - Locked/Unlocked
  - Renamed
- Layer order affects element stacking (Z-index)

### 🛠 Properties Panel
- Edit selected element properties like:
  - Position (X, Y)
  - Size (Width, Height)
  - Color
  - Border radius
  - Opacity
  - Font style (for text)
  - Text content

### 💾 Save & Load
- Save your work locally using **LocalStorage**
- Load the saved project automatically on page reload

---

## 🧠 How It Works

Domingoo uses vanilla JavaScript to:
- Handle tool selection and UI interactions
- Draw and manage elements on a canvas
- Keep track of layers and properties
- Save and load data using LocalStorage

---

## 🎯 Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- LocalStorage

---

## 🧰 Project Structure

/domingoo
│
├─ index.html
├─ style.css
└─ script.js


---

## 🧑‍💻 Usage

1. Use the toolbar to select tools:
   - **Click** = Select
   - **Move** = Move element
   - **Rectangle** = Draw rectangle
   - **Text** = Add text
2. Use the **Layers panel** to manage elements
3. Use the **Properties panel** to edit element properties
4. Save your work using the **Save button**

---

## 📌 Notes

This project is still in development and may more features will be added soon like:
- Advanced alignment tools
- Multiple shapes (circle, line, etc.)
- Grouping and more

---
