import { useEffect, useState, type FormEvent } from "react";
import { Bell, Building2, Check, Clock3, Globe2, Mail, PackageCheck, Save, ShieldCheck, ShoppingCart, UserRound } from "lucide-react";
import styles from "./styles/settings.module.css";

type Preferences = {
  businessName: string;
  currency: string;
  timezone: string;
  lowStockAlerts: boolean;
  salesAlerts: boolean;
  weeklySummary: boolean;
  supplierUpdates: boolean;
};
type SettingsSection = "business" | "notifications" | "account";

const defaults: Preferences = {
  businessName: "ProdUp I & S",
  currency: "GHS",
  timezone: "Africa/Accra",
  lowStockAlerts: true,
  salesAlerts: true,
  weeklySummary: false,
  supplierUpdates: false,
};

function getSavedPreferences(): Preferences {
  try {
    const saved = localStorage.getItem("appSettings");
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  } catch {
    return defaults;
  }
}

function getAccount() {
  try {
    const account = JSON.parse(localStorage.getItem("user") || "{}");
    return { name: typeof account.name === "string" ? account.name : "Account owner", email: typeof account.email === "string" ? account.email : "" };
  } catch {
    return { name: "Account owner", email: "" };
  }
}

export default function SettingsPage() {
  const [preferences, setPreferences] = useState<Preferences>(getSavedPreferences);
  const [activeSection, setActiveSection] = useState<SettingsSection>("business");
  const [saved, setSaved] = useState(false);
  const account = getAccount();

  useEffect(() => {
    if (!saved) return;
    const timeout = window.setTimeout(() => setSaved(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [saved]);

  const update = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPreferences((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("appSettings", JSON.stringify(preferences));
    setSaved(true);
  };

  return <div className={styles.page}>
    <header className={styles.heading}><div><p className={styles.eyebrow}>PREFERENCES</p><h1>Settings</h1><p className={styles.subtitle}>Manage your business preferences and notification choices.</p></div>{saved && <span className={styles.saved}><Check size={15} /> Saved to this browser</span>}</header>

    <div className={styles.layout}>
      <nav className={styles.sectionNav} aria-label="Settings sections">
        <button type="button" className={activeSection === "business" ? styles.currentNav : ""} aria-pressed={activeSection === "business"} onClick={() => setActiveSection("business")}><Building2 size={16} /> Business</button>
        <button type="button" className={activeSection === "notifications" ? styles.currentNav : ""} aria-pressed={activeSection === "notifications"} onClick={() => setActiveSection("notifications")}><Bell size={16} /> Notifications</button>
        <button type="button" className={activeSection === "account" ? styles.currentNav : ""} aria-pressed={activeSection === "account"} onClick={() => setActiveSection("account")}><UserRound size={16} /> Account</button>
      </nav>

      <form className={styles.settings} onSubmit={save}>
        {activeSection === "business" && <section className={styles.card} key="business">
          <div className={styles.cardHeading}><span className={styles.sectionIcon}><Building2 size={18} /></span><div><h2>Business preferences</h2><p>Choose the details and formats used for this workspace.</p></div></div>
          <div className={styles.fields}>
            <label className={`${styles.field} ${styles.fullWidth}`}><span>Business name</span><div><Building2 size={16} /><input value={preferences.businessName} onChange={(event) => update("businessName", event.target.value)} placeholder="Your business name" /></div></label>
            <label className={styles.field}><span>Currency</span><div><Globe2 size={16} /><select value={preferences.currency} onChange={(event) => update("currency", event.target.value)}><option value="GHS">GHS — Ghana cedi</option><option value="USD">USD — US dollar</option><option value="NGN">NGN — Nigerian naira</option><option value="GBP">GBP — British pound</option></select></div></label>
            <label className={styles.field}><span>Time zone</span><div><Clock3 size={16} /><select value={preferences.timezone} onChange={(event) => update("timezone", event.target.value)}><option value="Africa/Accra">Accra (GMT)</option><option value="Europe/London">London</option><option value="Africa/Lagos">Lagos (WAT)</option><option value="America/New_York">New York (ET)</option></select></div></label>
          </div>
          <p className={styles.note}>These preferences are saved in this browser and do not change values shown elsewhere in the app yet.</p>
        </section>}

        {activeSection === "notifications" && <section className={styles.card} key="notifications">
          <div className={styles.cardHeading}><span className={`${styles.sectionIcon} ${styles.bellIcon}`}><Bell size={18} /></span><div><h2>Notifications</h2><p>Choose which updates you want to see.</p></div></div>
          <div className={styles.toggleList}>
            <label className={styles.toggleRow}><span className={styles.toggleIcon}><PackageCheck size={17} /></span><span className={styles.toggleCopy}><strong>Low stock alerts</strong><small>Get notified when a product reaches its minimum stock level.</small></span><input type="checkbox" checked={preferences.lowStockAlerts} onChange={(event) => update("lowStockAlerts", event.target.checked)} /><i className={styles.switch} /></label>
            <label className={styles.toggleRow}><span className={styles.toggleIcon}><ShoppingCart size={17} /></span><span className={styles.toggleCopy}><strong>Sales updates</strong><small>Receive a notification when a sale is recorded.</small></span><input type="checkbox" checked={preferences.salesAlerts} onChange={(event) => update("salesAlerts", event.target.checked)} /><i className={styles.switch} /></label>
            <label className={styles.toggleRow}><span className={styles.toggleIcon}><Mail size={17} /></span><span className={styles.toggleCopy}><strong>Weekly summary</strong><small>Show a weekly overview of sales and inventory activity.</small></span><input type="checkbox" checked={preferences.weeklySummary} onChange={(event) => update("weeklySummary", event.target.checked)} /><i className={styles.switch} /></label>
            <label className={styles.toggleRow}><span className={styles.toggleIcon}><Bell size={17} /></span><span className={styles.toggleCopy}><strong>Supplier updates</strong><small>Get notified about changes to supplier records.</small></span><input type="checkbox" checked={preferences.supplierUpdates} onChange={(event) => update("supplierUpdates", event.target.checked)} /><i className={styles.switch} /></label>
          </div>
        </section>}

        {activeSection === "account" && <section className={styles.card} key="account">
          <div className={styles.cardHeading}><span className={`${styles.sectionIcon} ${styles.accountIcon}`}><ShieldCheck size={18} /></span><div><h2>Account</h2><p>Your current signed-in profile.</p></div></div>
          <div className={styles.accountRow}><span className={styles.avatar}>{account.name.trim().split(/\s+/).slice(0, 2).map((part: string) => part[0]?.toUpperCase()).join("") || "U"}</span><span><strong>{account.name}</strong><small>{account.email || "Email address not available"}</small></span><span className={styles.accountStatus}><i /> Active</span></div>
          <p className={styles.note}>Profile and password changes are managed by your account administrator.</p>
        </section>}

        {activeSection !== "account" && <div className={styles.actions}><span>Save your preferences on this device.</span><button type="submit"><Save size={16} /> Save changes</button></div>}
      </form>
    </div>
  </div>;
}
