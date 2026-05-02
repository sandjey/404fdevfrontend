import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactModal from "@/components/contact/ContactModal";

// O'quv platforma faqat o'zbek tilida.
export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header locale="uz" />
      <main className="min-h-[60vh]">{children}</main>
      <Footer locale="uz" />
      <ContactModal locale="uz" />
    </>
  );
}
