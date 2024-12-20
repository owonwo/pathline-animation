import "../styles/tailwind.css";

export default function Layout(props: { children: React.ReactNode }) {
  return <html lang="en">
    <head>
    </head>

    <body>
      {props.children}
    </body>
  </html>
}
