import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="copyright">
        &copy; {currentYear} Organization. All rights reserved.
      </div>
      
      <div className="footer-links">
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Use</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/help">Help & Support</Link>
      </div>
    </footer>
  );
}
