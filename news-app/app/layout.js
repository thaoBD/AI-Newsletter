import { NavLinks } from './ui/nav-links'
import './styles.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
