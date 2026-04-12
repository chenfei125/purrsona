import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getLang } from '../i18n';
import '../styles/TermsPage.css';

const TermsPage = () => {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    const handleLangChange = () => setUpdate(prev => prev + 1);
    window.addEventListener('langchange', handleLangChange);
    return () => window.removeEventListener('langchange', handleLangChange);
  }, []);

  const lang = getLang();

  const content = {
    en: {
      title: 'Terms of Service',
      updated: 'Last updated: April 11, 2026',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          body: `By accessing or using Purrsona ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We reserve the right to update these terms at any time, and continued use of the Service constitutes acceptance of any changes.`
        },
        {
          heading: '2. Description of Service',
          body: `Purrsona provides an online cat personality assessment tool that generates personality reports based on user-submitted answers. The Service includes both free and paid content. Free content is available to all users; paid content requires a one-time payment per report.`
        },
        {
          heading: '3. Payments and Refunds',
          body: `Each report unlock is a one-time purchase of USD $1.99. Payments are processed securely through PayPal. All sales are final. We do not offer refunds once a report has been successfully unlocked and delivered. If you experience a technical issue that prevents access to your purchased report, please contact us within 7 days and we will resolve it promptly.`
        },
        {
          heading: '4. User Responsibilities',
          body: `You agree to use the Service only for lawful purposes. You must not attempt to reverse-engineer, copy, or redistribute any part of the Service. You are responsible for maintaining the confidentiality of any account information and for all activities that occur under your session.`
        },
        {
          heading: '5. Intellectual Property',
          body: `All content on Purrsona, including but not limited to text, graphics, logos, report content, and software, is the property of Purrsona and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.`
        },
        {
          heading: '6. Disclaimer of Warranties',
          body: `The Service is provided "as is" without warranties of any kind, either express or implied. Purrsona does not warrant that the Service will be uninterrupted, error-free, or that the personality assessments are scientifically validated. The reports are intended for entertainment and general informational purposes only and should not be used as a substitute for professional veterinary or behavioral advice.`
        },
        {
          heading: '7. Limitation of Liability',
          body: `To the fullest extent permitted by law, Purrsona shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability to you for any claim arising from the Service shall not exceed the amount you paid for the specific report in question.`
        },
        {
          heading: '8. Privacy',
          body: `We respect your privacy. Purrsona does not collect personally identifiable information beyond what is necessary to process payments. Test answers and report data are stored locally in your browser and are not transmitted to our servers. Payment processing is handled entirely by PayPal and is subject to PayPal's privacy policy.`
        },
        {
          heading: '9. Third-Party Services',
          body: `The Service integrates with PayPal for payment processing. Your use of PayPal is subject to PayPal's own Terms of Service and Privacy Policy. Purrsona is not responsible for the practices or content of any third-party services.`
        },
        {
          heading: '10. Governing Law',
          body: `These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or your use of the Service shall be resolved through good-faith negotiation. If resolution cannot be reached, disputes shall be submitted to binding arbitration.`
        },
        {
          heading: '11. Contact Us',
          body: `If you have any questions about these Terms of Service, please contact us through the Contact page on our website. We aim to respond to all inquiries within 3 business days.`
        }
      ]
    },
    zh: {
      title: '服务条款',
      updated: '最后更新：2026年4月11日',
      sections: [
        {
          heading: '1. 条款接受',
          body: `访问或使用 Purrsona（"本服务"）即表示您同意受本服务条款的约束。如果您不同意这些条款，请不要使用本服务。我们保留随时更新这些条款的权利，继续使用本服务即表示接受任何变更。`
        },
        {
          heading: '2. 服务说明',
          body: `Purrsona 提供在线猫咪性格测评工具，根据用户提交的答案生成性格报告。本服务包含免费内容和付费内容。免费内容对所有用户开放；付费内容需要按报告单次付款解锁。`
        },
        {
          heading: '3. 付款与退款',
          body: `每份报告解锁为一次性付款，金额为 1.99 美元。付款通过 PayPal 安全处理。所有销售均为最终销售，报告成功解锁并交付后不提供退款。如果您遇到技术问题导致无法访问已购报告，请在 7 天内联系我们，我们将及时解决。`
        },
        {
          heading: '4. 用户责任',
          body: `您同意仅将本服务用于合法目的。您不得尝试对本服务的任何部分进行逆向工程、复制或再分发。您有责任维护任何账户信息的保密性，并对在您会话下发生的所有活动负责。`
        },
        {
          heading: '5. 知识产权',
          body: `Purrsona 上的所有内容，包括但不限于文字、图形、标志、报告内容和软件，均为 Purrsona 的财产，受适用知识产权法律保护。未经我们明确书面许可，您不得复制、分发或创作衍生作品。`
        },
        {
          heading: '6. 免责声明',
          body: `本服务按"现状"提供，不提供任何明示或暗示的保证。Purrsona 不保证服务不会中断、无错误，也不保证性格测评具有科学验证性。报告仅供娱乐和一般信息参考，不应作为专业兽医或行为建议的替代品。`
        },
        {
          heading: '7. 责任限制',
          body: `在法律允许的最大范围内，Purrsona 不对因您使用本服务而产生的任何间接、附带、特殊、后果性或惩罚性损害承担责任。我们对您因本服务产生的任何索赔的总责任不超过您为相关报告支付的金额。`
        },
        {
          heading: '8. 隐私',
          body: `我们尊重您的隐私。Purrsona 不收集超出处理付款所需的个人身份信息。测试答案和报告数据存储在您的浏览器本地，不会传输到我们的服务器。付款处理完全由 PayPal 处理，受 PayPal 隐私政策约束。`
        },
        {
          heading: '9. 第三方服务',
          body: `本服务集成 PayPal 进行付款处理。您对 PayPal 的使用受 PayPal 自身服务条款和隐私政策的约束。Purrsona 不对任何第三方服务的做法或内容负责。`
        },
        {
          heading: '10. 适用法律',
          body: `本条款受适用法律管辖和解释。因本条款或您使用本服务产生的任何争议应通过善意协商解决。如无法达成解决方案，争议应提交具有约束力的仲裁。`
        },
        {
          heading: '11. 联系我们',
          body: `如果您对本服务条款有任何疑问，请通过我们网站上的联系页面与我们联系。我们力争在 3 个工作日内回复所有咨询。`
        }
      ]
    },
    vi: {
      title: 'Điều khoản dịch vụ',
      updated: 'Cập nhật lần cuối: 11 tháng 4, 2026',
      sections: [
        { heading: '1. Chấp nhận điều khoản', body: 'Bằng cách sử dụng Purrsona, bạn đồng ý với các Điều khoản Dịch vụ này.' },
        { heading: '2. Mô tả dịch vụ', body: 'Purrsona cung cấp công cụ đánh giá tính cách mèo trực tuyến với nội dung miễn phí và trả phí.' },
        { heading: '3. Thanh toán và hoàn tiền', body: 'Mỗi lần mở khóa báo cáo là thanh toán một lần $1.99 USD qua PayPal. Không hoàn tiền sau khi báo cáo đã được mở khóa.' },
        { heading: '4. Trách nhiệm người dùng', body: 'Bạn đồng ý chỉ sử dụng dịch vụ cho mục đích hợp pháp.' },
        { heading: '5. Sở hữu trí tuệ', body: 'Tất cả nội dung trên Purrsona là tài sản của Purrsona và được bảo vệ bởi luật sở hữu trí tuệ.' },
        { heading: '6. Tuyên bố miễn trách', body: 'Dịch vụ được cung cấp "nguyên trạng". Báo cáo chỉ dành cho mục đích giải trí và thông tin chung.' },
        { heading: '7. Giới hạn trách nhiệm', body: 'Purrsona không chịu trách nhiệm về các thiệt hại gián tiếp phát sinh từ việc sử dụng dịch vụ.' },
        { heading: '8. Quyền riêng tư', body: 'Dữ liệu bài kiểm tra được lưu trữ cục bộ trong trình duyệt của bạn và không được truyền đến máy chủ của chúng tôi.' },
        { heading: '9. Dịch vụ bên thứ ba', body: 'Việc sử dụng PayPal của bạn tuân theo Điều khoản Dịch vụ của PayPal.' },
        { heading: '10. Luật điều chỉnh', body: 'Các tranh chấp sẽ được giải quyết thông qua đàm phán thiện chí hoặc trọng tài ràng buộc.' },
        { heading: '11. Liên hệ', body: 'Vui lòng liên hệ với chúng tôi qua trang Liên hệ nếu bạn có câu hỏi.' }
      ]
    },
    th: {
      title: 'ข้อกำหนดการให้บริการ',
      updated: 'อัปเดตล่าสุด: 11 เมษายน 2026',
      sections: [
        { heading: '1. การยอมรับข้อกำหนด', body: 'การใช้ Purrsona ถือว่าคุณยอมรับข้อกำหนดการให้บริการเหล่านี้' },
        { heading: '2. คำอธิบายบริการ', body: 'Purrsona ให้บริการเครื่องมือประเมินบุคลิกภาพแมวออนไลน์พร้อมเนื้อหาฟรีและแบบชำระเงิน' },
        { heading: '3. การชำระเงินและการคืนเงิน', body: 'การปลดล็อกรายงานแต่ละครั้งเป็นการชำระเงินครั้งเดียว $1.99 USD ผ่าน PayPal ไม่มีการคืนเงินหลังจากปลดล็อกรายงานแล้ว' },
        { heading: '4. ความรับผิดชอบของผู้ใช้', body: 'คุณตกลงที่จะใช้บริการเพื่อวัตถุประสงค์ที่ถูกกฎหมายเท่านั้น' },
        { heading: '5. ทรัพย์สินทางปัญญา', body: 'เนื้อหาทั้งหมดบน Purrsona เป็นทรัพย์สินของ Purrsona และได้รับการคุ้มครองโดยกฎหมายทรัพย์สินทางปัญญา' },
        { heading: '6. การปฏิเสธการรับประกัน', body: 'บริการนี้ให้บริการ "ตามสภาพ" รายงานมีไว้เพื่อความบันเทิงและข้อมูลทั่วไปเท่านั้น' },
        { heading: '7. การจำกัดความรับผิด', body: 'Purrsona ไม่รับผิดชอบต่อความเสียหายทางอ้อมที่เกิดจากการใช้บริการ' },
        { heading: '8. ความเป็นส่วนตัว', body: 'ข้อมูลการทดสอบถูกเก็บไว้ในเบราว์เซอร์ของคุณและไม่ได้ส่งไปยังเซิร์ฟเวอร์ของเรา' },
        { heading: '9. บริการของบุคคลที่สาม', body: 'การใช้ PayPal ของคุณอยู่ภายใต้ข้อกำหนดการให้บริการของ PayPal' },
        { heading: '10. กฎหมายที่ใช้บังคับ', body: 'ข้อพิพาทจะได้รับการแก้ไขผ่านการเจรจาโดยสุจริตหรืออนุญาโตตุลาการที่มีผลผูกพัน' },
        { heading: '11. ติดต่อเรา', body: 'โปรดติดต่อเราผ่านหน้าติดต่อหากคุณมีคำถาม' }
      ]
    },
    id: {
      title: 'Syarat Layanan',
      updated: 'Terakhir diperbarui: 11 April 2026',
      sections: [
        { heading: '1. Penerimaan Syarat', body: 'Dengan menggunakan Purrsona, Anda setuju untuk terikat oleh Syarat Layanan ini.' },
        { heading: '2. Deskripsi Layanan', body: 'Purrsona menyediakan alat penilaian kepribadian kucing online dengan konten gratis dan berbayar.' },
        { heading: '3. Pembayaran dan Pengembalian Dana', body: 'Setiap pembukaan laporan adalah pembayaran satu kali sebesar $1.99 USD melalui PayPal. Tidak ada pengembalian dana setelah laporan berhasil dibuka.' },
        { heading: '4. Tanggung Jawab Pengguna', body: 'Anda setuju untuk menggunakan layanan hanya untuk tujuan yang sah.' },
        { heading: '5. Kekayaan Intelektual', body: 'Semua konten di Purrsona adalah milik Purrsona dan dilindungi oleh hukum kekayaan intelektual.' },
        { heading: '6. Penafian Jaminan', body: 'Layanan disediakan "apa adanya". Laporan hanya untuk tujuan hiburan dan informasi umum.' },
        { heading: '7. Batasan Tanggung Jawab', body: 'Purrsona tidak bertanggung jawab atas kerusakan tidak langsung yang timbul dari penggunaan layanan.' },
        { heading: '8. Privasi', body: 'Data tes disimpan secara lokal di browser Anda dan tidak dikirimkan ke server kami.' },
        { heading: '9. Layanan Pihak Ketiga', body: 'Penggunaan PayPal Anda tunduk pada Syarat Layanan PayPal.' },
        { heading: '10. Hukum yang Berlaku', body: 'Sengketa akan diselesaikan melalui negosiasi itikad baik atau arbitrase yang mengikat.' },
        { heading: '11. Hubungi Kami', body: 'Silakan hubungi kami melalui halaman Kontak jika Anda memiliki pertanyaan.' }
      ]
    }
  };

  const c = content[lang] || content['en'];

  return (
    <div className="terms-page">
      <Helmet>
        <title>{c.title} - Purrsona</title>
        <meta name="description" content="Purrsona Terms of Service - Please read before using our cat personality test service." />
      </Helmet>

      {/* Header */}
      <div className="terms-header">
        <div className="container">
          <h1 className="terms-title">{c.title}</h1>
          <p className="terms-updated">{c.updated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="terms-content container">
        <div className="terms-card">
          {c.sections.map((section, index) => (
            <div key={index} className="terms-section">
              <h2 className="terms-section-heading">{section.heading}</h2>
              <p className="terms-section-body">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
