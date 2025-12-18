import { getFooter } from "@/lib/payload";

export async function Footer() {
  const footerData = await getFooter();

  if (!footerData) {
    return null;
  }

  const { contactInfo, copyright, description, additionalLinks } = footerData;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Description */}
          {description && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Про нас</h3>
              <p className="text-gray-300">{description}</p>
            </div>
          )}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-2 text-gray-300">
              {contactInfo?.phone && (
                <li>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    📞 {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo?.email && (
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-white transition-colors"
                  >
                    ✉️ {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo?.telegram && (
                <li>
                  <a
                    href={
                      contactInfo.telegram.startsWith("http")
                        ? contactInfo.telegram
                        : `https://t.me/${contactInfo.telegram.replace("@", "")}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    💬 {contactInfo.telegram}
                  </a>
                </li>
              )}
              {contactInfo?.instagram && (
                <li>
                  <a
                    href={
                      contactInfo.instagram.startsWith("http")
                        ? contactInfo.instagram
                        : `https://instagram.com/${contactInfo.instagram.replace("@", "")}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    📷 {contactInfo.instagram}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Additional Links */}
          {additionalLinks && additionalLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Посилання</h3>
              <ul className="space-y-2">
                {additionalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Copyright */}
        {copyright && (
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  );
}

