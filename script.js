// تهيئة سنة التذييل
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // تبديل قائمة التنقل للهاتف
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("primary-nav");

  const setExpanded = (expanded) => {
    if (!toggle) return;
    toggle.setAttribute("aria-expanded", String(expanded));
    document.body.classList.toggle("nav-open", expanded);
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      setExpanded(!expanded);
    });
  }

  // إغلاق القائمة عند النقر على رابط تنقل
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setExpanded(false));
  });

  // حركة ظهور العناصر عند التمرير
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.25 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // تحسين تجربة التمرير إلى الأقسام مع مراعاة ارتفاع الهيدر
  const headerHeight = header?.offsetHeight || 0;
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
});

