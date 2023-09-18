# CME Newsletter Builder

Generate a newsletter with the assistance of OpenAI. Simply input the necessary data and let the application create a structured newsletter for you.

## Tech Stack

- NextJS
- TailwindCSS
- OpenAI GPT-3

## Getting Started

To get the application up and running, follow these steps:

1. Clone the repository and open it in Visual Studio Code.
2. Open a new terminal in Visual Studio Code.
3. Install the necessary npm packages by running the command: 
    ```
    npm i
    ```
4. Start the development server with:
    ```
    npm run dev
    ```

The application will be live at [http://localhost:3000](http://localhost:3000).

## Customization

You can personalize the color scheme of the application to suit your preference. Here's how you can change the color scheme in the `index.js` file:

### Header

Replace the current purple color code with the code of your desired color. Find the following lines and replace the class names associated with colors:

```jsx
<main className={"bg-purple-100"}>
<div className={"border-b-2 text-4xl text-center py-5 bg-purple-700 text-zinc-50"}>
    CME Newsletter Builder
</div>
