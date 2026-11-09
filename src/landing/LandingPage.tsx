import { useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BarChart3, Boxes, Check, ChevronDown,
  ClipboardList, Menu, Package, Pill, ShieldCheck, Shirt, ShoppingBag,
  Smartphone, Store, Users, X,
} from "lucide-react";
import DashboardPreview from "./components/DashboardPreview";
import styles from "./landing.module.css";

const capabilities = [
  { icon: Package, title: "Product records", description: "Create and update the information your team needs to know about each product." },
  { icon: Boxes, title: "Inventory overview", description: "Keep stock levels, adjustments and product availability in view." },
  { icon: ShoppingBag, title: "Sales activity", description: "Record sales and review the activity moving through your business." },
  { icon: Users, title: "Customers & suppliers", description: "Keep the details of your customers and suppliers organized." },
  { icon: BarChart3, title: "Business reports", description: "Bring useful business activity into a more readable overview." },
  { icon: ShieldCheck, title: "Team access", description: "Organize business users and roles as your team grows." },
];

const sectors = [
  { icon: Pill, name: "Pharmacies", note: "Products and stock" },
  { icon: Store, name: "Supermarkets", note: "Stock and sales" },
  { icon: Smartphone, name: "Electronics", note: "Products and operations" },
  { icon: Shirt, name: "Fashion", note: "Products and inventory" },
  { icon: ClipboardList, name: "Growing businesses", note: "Everyday organization" },
];

const questions = [
  { question: "What is ProdUp I & S?", answer: "ProdUp I & S is a business management platform for organizing products, inventory and sales." },
  { question: "Who is ProdUp for?", answer: "It is intended for pharmacies, supermarkets, electronics shops, fashion businesses and other small and medium-sized businesses." },
  { question: "Can I track stock and sales?", answer: "Inventory and sales are key areas of ProdUp. The specific tools available depend on the current product release." },
  { question: "Can my employees use ProdUp?", answer: "Team users and access roles are part of the planned offering. Please check current availability when you create an account." },
  { question: "How much does ProdUp cost?", answer: "Pricing plans have not been announced. Create an account to ask about current availability and pricing." },
];

const steps = [
  ["01", "Create your account", "Register to get started with ProdUp."],
  ["02", "Set up your business", "Add your business details and prepare your workspace."],
  ["03", "Organize your products", "Build your catalogue and inventory records."],
  ["04", "Manage your operations", "Record sales and keep daily activity in view."],
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(0);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={styles.page} id="home">
      <header className={styles.header}>
        <a className={styles.brand} href="#home" onClick={closeMenu} aria-label="ProdUp home">
          <span className={styles.brandIcon}><Boxes size={17} /></span>
          <span>produp<small>INVENTORY &amp; SALES</small></span>
        </a>
        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav} aria-label="Main navigation">
          <a href="#platform" onClick={closeMenu}>Platform</a>
          <a href="#businesses" onClick={closeMenu}>Businesses</a>
          <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
          <a href="#faq" onClick={closeMenu}>FAQs</a>
          <span className={styles.navGap} />
          <a href="/login" onClick={closeMenu}>Sign in</a>
          <a className={styles.navCta} href="/register" onClick={closeMenu}>Get started <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span /> INVENTORY &amp; SALES, IN BETTER ORDER</div>
            <h1>Run your business.<br />Know where you <em>stand.</em></h1>
            <p>Keep products, inventory and sales together in a clearer view. ProdUp I &amp; S helps you get organized and stay close to the work that keeps your business moving.</p>
            <div className={styles.heroActions}>
              <a className={styles.buttonPrimary} href="/register">Create your account <ArrowRight size={15} /></a>
              <a className={styles.heroLink} href="#platform">See what you can do <ArrowDown size={14} /></a>
            </div>
            <div className={styles.heroNote}><span className={styles.noteMark}><Check size={13} /></span> One workspace for everyday business essentials</div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.visualLabel}><span /> YOUR BUSINESS, IN VIEW</div>
            <DashboardPreview />
            <div className={styles.visualFoot}><span>Designed around the everyday</span><span>Workspace preview</span></div>
          </div>
          <div className={styles.heroBottom}><span>01</span><i /><span>Products · Inventory · Sales</span><a href="#the-challenge">Discover the approach <ArrowDown size={13} /></a></div>
        </section>

        <section className={styles.challenge} id="the-challenge">
          <div className={styles.sectionIntro}>
            <span className={styles.sectionTag}>A CLEARER WAY TO RUN THE DAY</span>
            <h2>Less scattered admin.<br /><em>More business in focus.</em></h2>
            <p>When records live in different places, it takes extra effort to understand what is happening.</p>
          </div>
          <div className={styles.challengeGrid}>
            <article className={styles.challengeCard}>
              <span className={styles.challengeLabel}>THE EVERYDAY FRICTION</span>
              <h3>Too many details to keep up with.</h3>
              <ul>
                <li><X size={14} />Stock counts in sheets and notebooks</li>
                <li><X size={14} />Unclear movement in and out of stock</li>
                <li><X size={14} />Sales records that are hard to review</li>
                <li><X size={14} />Customer and supplier details scattered around</li>
              </ul>
            </article>
            <article className={styles.answerCard}>
              <span className={styles.answerIcon}><Boxes size={19} /></span>
              <span className={styles.challengeLabel}>THE PRODUP APPROACH</span>
              <h3>Bring the essentials together.</h3>
              <ul>
                <li><Check size={14} />Organized product records</li>
                <li><Check size={14} />Inventory levels in view</li>
                <li><Check size={14} />Sales activity easier to follow</li>
                <li><Check size={14} />Business contacts kept together</li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.platform} id="platform">
          <div className={styles.sectionIntro}>
            <span className={styles.sectionTag}>THE EVERYDAY TOOLKIT</span>
            <h2>One place for the work<br />behind every sale.</h2>
            <p>Practical tools for organizing the information that helps your business run.</p>
          </div>
          <div className={styles.featureGrid}>
            {capabilities.map(({ icon: Icon, title, description }, index) => (
              <article className={styles.featureCard} key={title}>
                <div className={styles.featureTop}><span><Icon size={18} /></span><small>0{index + 1}</small></div>
                <h3>{title}</h3><p>{description}</p>
                <span className={styles.featureLine} />
              </article>
            ))}
          </div>
        </section>

        <section className={styles.businesses} id="businesses">
          <div className={styles.businessIntro}>
            <span className={styles.sectionTag}>MADE FOR THE WAY YOU WORK</span>
            <h2>For shops with a lot<br />to keep <em>in motion.</em></h2>
            <p>From a local pharmacy to a growing retailer, ProdUp supports a more organized approach to products, stock and sales.</p>
            <a href="/register" className={styles.inlineLink}>Explore ProdUp <ArrowRight size={14} /></a>
          </div>
          <div className={styles.sectorGrid}>
            {sectors.map(({ icon: Icon, name, note }, index) => (
              <article key={name} className={styles.sectorCard}>
                <div className={styles.sectorHead}><span>0{index + 1}</span><Icon size={18} /></div>
                <h3>{name}</h3><p>{note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.how} id="how-it-works">
          <div className={styles.howHeader}>
            <div><span className={styles.sectionTag}>START WITH THE ESSENTIALS</span><h2>Four steps to a clearer<br /><em>business workspace.</em></h2></div>
            <p>Set up at your own pace. Begin with your business and build from there.</p>
          </div>
          <div className={styles.stepGrid}>
            {steps.map(([number, title, description]) => (
              <article className={styles.stepCard} key={number}>
                <span className={styles.stepNumber}>{number}</span><span className={styles.stepRule} />
                <h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.pricing} id="pricing">
          <div className={styles.priceMark}><span>PLANS<br />ON THE<br />HORIZON</span></div>
          <div className={styles.pricingText}>
            <span className={styles.sectionTag}>PRICING DETAILS ARE IN PROGRESS</span>
            <h2>A good fit starts<br />with a <em>conversation.</em></h2>
            <p>Subscription plans and prices are still being established. Create an account to ask about availability and get updates when details are ready.</p>
            <a href="/register" className={styles.buttonPrimary}>Ask about ProdUp <ArrowRight size={14} /></a>
          </div>
          <div className={styles.pricingAside}><span><Check size={14} />Product organization</span><span><Check size={14} />Inventory overview</span><span><Check size={14} />Sales activity</span><small>Availability may vary by product release.</small></div>
        </section>

        <section className={styles.faq} id="faq">
          <div className={styles.faqIntro}><span className={styles.sectionTag}>A FEW GOOD QUESTIONS</span><h2>Good to know<br /><em>before you begin.</em></h2><p>Answers to common questions about ProdUp.</p></div>
          <div className={styles.faqList}>
            {questions.map(({ question, answer }, index) => (
              <article className={activeQuestion === index ? `${styles.faqItem} ${styles.faqItemOpen}` : styles.faqItem} key={question}>
                <button onClick={() => setActiveQuestion(activeQuestion === index ? null : index)} aria-expanded={activeQuestion === index}>
                  <span><i>0{index + 1}</i>{question}</span><ChevronDown size={16} />
                </button>
                {activeQuestion === index && <p>{answer}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.ctaDecoration} />
          <span className={styles.sectionTag}>YOUR NEXT STEP</span>
          <h2>Bring your business<br />into better <em>focus.</em></h2>
          <p>Start organizing your products, inventory and sales with ProdUp I &amp; S.</p>
          <a href="/register" className={styles.buttonLight}>Create your account <ArrowRight size={15} /></a>
          <span className={styles.ctaSignature}>PRODUP I &amp; S <i /> BUSINESS, IN BETTER ORDER.</span>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrandBlock}>
            <a className={styles.brand} href="#home"><span className={styles.brandIcon}><Boxes size={17} /></span><span>produp<small>INVENTORY &amp; SALES</small></span></a>
            <p>Products, inventory and sales<br />in a clearer view.</p>
          </div>
          <div className={styles.footerColumn}><b>Explore</b><a href="#platform">Platform</a><a href="#businesses">Businesses</a><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a></div>
          <div className={styles.footerColumn}><b>Your account</b><a href="/register">Create an account</a><a href="/login">Sign in</a><a href="#faq">FAQs</a></div>
          <div className={styles.footerColumn}><b>ProdUp I &amp; S</b><span>Business, in better order.</span><a href="#home">Back to top ↑</a></div>
        </div>
        <div className={styles.footerBottom}><span>© {new Date().getFullYear()} ProdUp I &amp; S</span><span>Built for everyday business.</span></div>
      </footer>
    </div>
  );
}
