/*
 * ========================================
 * PLAYGROUND PAGE - UI Components Testing
 * ========================================
 *
 * صفحة لتجربة جميع مكونات الـ UI
 * كل المكونات تدعم RTL/LTR و Dark/Light Mode
 */

import { useState } from 'react';
import { useLanguage } from '../../../core/providers/LanguageProvider';

// ===== UI Components =====
import {
  Button,
  ButtonGroup,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  useToast,
} from '../../../core/components/ui';

// ===== Icons =====
import {
  User,
  Mail,
  Lock,
  Plus,
  Save,
  Edit,
  Trash2,
  Check,
  EyeOff,
} from 'lucide-react';

const PlaygroundPage = () => {
  const { direction, language } = useLanguage();
  const toast = useToast();

  // ===== States =====
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isRTL = direction === 'rtl';

  // ===== Options =====
  const selectOptions = [
    { value: 'option1', label: isRTL ? 'الخيار الأول' : 'Option 1' },
    { value: 'option2', label: isRTL ? 'الخيار الثاني' : 'Option 2' },
    { value: 'option3', label: isRTL ? 'الخيار الثالث' : 'Option 3' },
  ];

  const radioOptions = [
    { value: 'option1', label: isRTL ? 'الخيار الأول' : 'Option 1' },
    { value: 'option2', label: isRTL ? 'الخيار الثاني' : 'Option 2' },
    { value: 'option3', label: isRTL ? 'الخيار الثالث' : 'Option 3' },
  ];

  // ===== Handlers =====
  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.toast({
        title: isRTL ? 'تم الإرسال بنجاح' : 'Submitted Successfully',
        message: isRTL ? 'تم إرسال النموذج بنجاح' : 'The form was submitted successfully.',
        variant: 'success',
      });
    }, 2000);
  };

  const handleError = () => {
    toast.toast({
      title: isRTL ? 'حدث خطأ' : 'An Error Occurred',
      message: isRTL ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred.',
      variant: 'error',
    });
  };

  const handleInfo = () => {
    toast.toast({
      title: isRTL ? 'معلومات' : 'Information',
      message: isRTL ? 'هذه رسالة معلومات' : 'This is an informational message.',
      variant: 'info',
    });
  };

  const handleWarning = () => {
    toast.toast({
      title: isRTL ? 'تحذير' : 'Warning',
      message: isRTL ? 'هذا تحذير مهم' : 'This is an important warning.',
      variant: 'warning',
    });
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--color-border)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 'var(--font-size-2xl, 24px)',
              fontWeight: 'var(--font-weight-bold, 700)',
              color: 'var(--color-text)',
            }}
          >
            🧪 {isRTL ? 'ملعب المكونات' : 'UI Components Playground'}
          </h1>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              marginTop: '0.25rem',
            }}
          >
            {isRTL
              ? 'صفحة لتجربة جميع مكونات واجهة المستخدم'
              : 'Test all UI components in one place'}
          </p>
        </div>

        <Badge variant="primary" size="lg">
          {isRTL ? 'اللغة الحالية' : 'Current Language'}: {language} ({direction})
        </Badge>
      </div>

      {/* ========================================
          SECTION: Buttons
          ======================================== */}
      <Card variant="default" padding="md" style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <h3 style={{ fontSize: 'var(--font-size-lg, 18px)', fontWeight: 600 }}>
            🔘 {isRTL ? 'الأزرار' : 'Buttons'}
          </h3>
          <Badge>{isRTL ? 'جميع الأشكال' : 'All Variants'}</Badge>
        </CardHeader>
        <CardBody>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <Button variant="primary" onClick={handleInfo}>
              {isRTL ? 'أساسي' : 'Primary'}
            </Button>
            <Button variant="secondary">{isRTL ? 'ثانوي' : 'Secondary'}</Button>
            <Button variant="success">{isRTL ? 'نجاح' : 'Success'}</Button>
            <Button variant="danger">{isRTL ? 'خطر' : 'Danger'}</Button>
            <Button variant="warning">{isRTL ? 'تحذير' : 'Warning'}</Button>
            <Button variant="info">{isRTL ? 'معلومات' : 'Info'}</Button>
            <Button variant="ghost">{isRTL ? 'شفاف' : 'Ghost'}</Button>
            <Button variant="outline">{isRTL ? 'إطار' : 'Outline'}</Button>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <Button size="xs">{isRTL ? 'صغير جداً' : 'XS'}</Button>
            <Button size="sm">{isRTL ? 'صغير' : 'SM'}</Button>
            <Button size="md">{isRTL ? 'متوسط' : 'MD'}</Button>
            <Button size="lg">{isRTL ? 'كبير' : 'LG'}</Button>
            <Button size="xl">{isRTL ? 'كبير جداً' : 'XL'}</Button>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <Button leftIcon={<Plus size={18} />}>
              {isRTL ? 'إضافة' : 'Add'}
            </Button>
            <Button rightIcon={<Save size={18} />} variant="success">
              {isRTL ? 'حفظ' : 'Save'}
            </Button>
            <Button leftIcon={<Edit size={18} />} variant="warning">
              {isRTL ? 'تعديل' : 'Edit'}
            </Button>
            <Button leftIcon={<Trash2 size={18} />} variant="danger">
              {isRTL ? 'حذف' : 'Delete'}
            </Button>
            <Button loading isLoading>
              {isRTL ? 'جاري التحميل' : 'Loading...'}
            </Button>
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
            <p style={{ marginBottom: '0.5rem', fontSize: 'var(--font-size-sm, 14px)', color: 'var(--color-text-secondary)' }}>
              {isRTL ? 'مجموعة أزرار' : 'Button Group'}
            </p>
            <ButtonGroup>
              <Button>{isRTL ? 'يسار' : 'Left'}</Button>
              <Button>{isRTL ? 'وسط' : 'Center'}</Button>
              <Button>{isRTL ? 'يمين' : 'Right'}</Button>
            </ButtonGroup>
          </div>
        </CardBody>
      </Card>

      {/* ========================================
          SECTION: Badges
          ======================================== */}
      <Card variant="default" padding="md" style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <h3 style={{ fontSize: 'var(--font-size-lg, 18px)', fontWeight: 600 }}>
            🏷️ {isRTL ? 'الشارات' : 'Badges'}
          </h3>
        </CardHeader>
        <CardBody>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <Badge variant="primary">{isRTL ? 'أساسي' : 'Primary'}</Badge>
            <Badge variant="secondary">{isRTL ? 'ثانوي' : 'Secondary'}</Badge>
            <Badge variant="success">{isRTL ? 'نجاح' : 'Success'}</Badge>
            <Badge variant="danger">{isRTL ? 'خطر' : 'Danger'}</Badge>
            <Badge variant="warning">{isRTL ? 'تحذير' : 'Warning'}</Badge>
            <Badge variant="info">{isRTL ? 'معلومات' : 'Info'}</Badge>
            <Badge variant="ghost">{isRTL ? 'شفاف' : 'Ghost'}</Badge>
            <Badge variant="outline">{isRTL ? 'إطار' : 'Outline'}</Badge>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <Badge size="xs">{isRTL ? 'صغير جداً' : 'XS'}</Badge>
            <Badge size="sm">{isRTL ? 'صغير' : 'SM'}</Badge>
            <Badge size="md">{isRTL ? 'متوسط' : 'MD'}</Badge>
            <Badge size="lg">{isRTL ? 'كبير' : 'LG'}</Badge>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <Badge rounded>{isRTL ? 'دائري' : 'Rounded'}</Badge>
            <Badge dot>{isRTL ? 'مع نقطة' : 'With Dot'}</Badge>
            <Badge dot dotColor="var(--color-success)">{isRTL ? 'متصل' : 'Online'}</Badge>
            <Badge dot dotColor="var(--color-error)">{isRTL ? 'غير متصل' : 'Offline'}</Badge>
            <Badge variant="success" rounded dot>
              {isRTL ? 'نشط' : 'Active'}
            </Badge>
          </div>
        </CardBody>
      </Card>

      {/* ========================================
          SECTION: Cards
          ======================================== */}
      <Card variant="default" padding="md" style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <h3 style={{ fontSize: 'var(--font-size-lg, 18px)', fontWeight: 600 }}>
            🃏 {isRTL ? 'البطاقات' : 'Cards'}
          </h3>
        </CardHeader>
        <CardBody>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <Card variant="default" padding="md" hoverable>
              <CardHeader>
                <h4 style={{ fontSize: 'var(--font-size-md, 16px)', fontWeight: 600 }}>
                  {isRTL ? 'بطاقة عادية' : 'Default Card'}
                </h4>
              </CardHeader>
              <CardBody>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  {isRTL
                    ? 'هذه بطاقة عادية مع تأثير hover'
                    : 'This is a default card with hover effect'}
                </p>
              </CardBody>
              <CardFooter>
                <Button size="sm">{isRTL ? 'عرض' : 'View'}</Button>
                <Button size="sm" variant="outline">{isRTL ? 'تعديل' : 'Edit'}</Button>
              </CardFooter>
            </Card>

            <Card variant="outline" padding="md">
              <CardHeader>
                <h4 style={{ fontSize: 'var(--font-size-md, 16px)', fontWeight: 600 }}>
                  {isRTL ? 'بطاقة إطار' : 'Outline Card'}
                </h4>
              </CardHeader>
              <CardBody>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  {isRTL
                    ? 'هذه بطاقة بإطار فقط بدون خلفية'
                    : 'This is an outline card without background'}
                </p>
              </CardBody>
            </Card>

            <Card variant="ghost" padding="md">
              <CardHeader>
                <h4 style={{ fontSize: 'var(--font-size-md, 16px)', fontWeight: 600 }}>
                  {isRTL ? 'بطاقة شفافة' : 'Ghost Card'}
                </h4>
              </CardHeader>
              <CardBody>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  {isRTL
                    ? 'هذه بطاقة شفافة بدون حدود أو خلفية'
                    : 'This is a ghost card without border or background'}
                </p>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>

      {/* ========================================
          SECTION: Alerts
          ======================================== */}
      <Card variant="default" padding="md" style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <h3 style={{ fontSize: 'var(--font-size-lg, 18px)', fontWeight: 600 }}>
            ⚠️ {isRTL ? 'التنبيهات' : 'Alerts'}
          </h3>
        </CardHeader>
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Alert variant="success" title={isRTL ? 'نجاح' : 'Success'}>
              {isRTL ? 'تمت العملية بنجاح' : 'Operation completed successfully'}
            </Alert>
            <Alert variant="warning" title={isRTL ? 'تحذير' : 'Warning'}>
              {isRTL ? 'يرجى مراجعة البيانات المدخلة' : 'Please review the entered data'}
            </Alert>
            <Alert variant="error" title={isRTL ? 'خطأ' : 'Error'}>
              {isRTL ? 'حدث خطأ أثناء تنفيذ العملية' : 'An error occurred while processing'}
            </Alert>
            <Alert
              variant="info"
              title={isRTL ? 'معلومات' : 'Information'}
              dismissible
              onDismiss={() => toast.toast({
                title: isRTL ? 'تم الإغلاق' : 'Dismissed',
                message: isRTL ? 'تم إغلاق التنبيه' : 'Alert was dismissed',
                variant: 'info',
              })}
            >
              {isRTL
                ? 'هذا تنبيه قابل للإغلاق'
                : 'This is a dismissible alert'}
            </Alert>
            <Alert
              variant="success"
              icon={<Check size={20} />}
              title={isRTL ? 'مع أيقونة مخصصة' : 'With Custom Icon'}
            >
              {isRTL
                ? 'يمكنك استخدام أيقونة مخصصة'
                : 'You can use a custom icon'}
            </Alert>
          </div>
        </CardBody>
      </Card>

      {/* ========================================
          SECTION: Modal
          ======================================== */}
      <Card variant="default" padding="md" style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <h3 style={{ fontSize: 'var(--font-size-lg, 18px)', fontWeight: 600 }}>
            📦 {isRTL ? 'النافذة المنبثقة' : 'Modal'}
          </h3>
          <Button onClick={() => setModalOpen(true)} variant="primary">
            {isRTL ? 'فتح النافذة' : 'Open Modal'}
          </Button>
        </CardHeader>
        <CardBody>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {isRTL
              ? 'اضغط على الزر لفتح النافذة المنبثقة'
              : 'Click the button to open the modal'}
          </p>
        </CardBody>
      </Card>

      {/* ========================================
          SECTION: Toast
          ======================================== */}
      <Card variant="default" padding="md" style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <h3 style={{ fontSize: 'var(--font-size-lg, 18px)', fontWeight: 600 }}>
            🍞 {isRTL ? 'الإشعارات المنبثقة' : 'Toasts'}
          </h3>
        </CardHeader>
        <CardBody>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <Button variant="success" onClick={handleSubmit}>
              {isRTL ? 'إشعار نجاح' : 'Success Toast'}
            </Button>
            <Button variant="danger" onClick={handleError}>
              {isRTL ? 'إشعار خطأ' : 'Error Toast'}
            </Button>
            <Button variant="info" onClick={handleInfo}>
              {isRTL ? 'إشعار معلومات' : 'Info Toast'}
            </Button>
            <Button variant="warning" onClick={handleWarning}>
              {isRTL ? 'إشعار تحذير' : 'Warning Toast'}
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* ========================================
          SECTION: Form Inputs
          ======================================== */}
      <Card variant="default" padding="md" style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <h3 style={{ fontSize: 'var(--font-size-lg, 18px)', fontWeight: 600 }}>
            📝 {isRTL ? 'حقول الإدخال' : 'Form Inputs'}
          </h3>
        </CardHeader>
        <CardBody>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <Input
              label={isRTL ? 'الاسم' : 'Name'}
              placeholder={isRTL ? 'أدخل اسمك' : 'Enter your name'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              leftIcon={<User size={18} />}
              hint={isRTL ? 'أدخل الاسم الكامل' : 'Enter your full name'}
            />

            <Input
              label={isRTL ? 'البريد الإلكتروني' : 'Email'}
              placeholder="example@email.com"
              type="email"
              leftIcon={<Mail size={18} />}
              rightIcon={<Check size={18} />}
              state="success"
              success={isRTL ? 'بريد إلكتروني صحيح' : 'Valid email'}
            />

            <Input
              label={isRTL ? 'كلمة المرور' : 'Password'}
              placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter password'}
              type="password"
              leftIcon={<Lock size={18} />}
              rightIcon={<EyeOff size={18} />}
              state="error"
              error={isRTL ? 'كلمة المرور ضعيفة' : 'Password is weak'}
            />

            <Textarea
              label={isRTL ? 'ملاحظات' : 'Notes'}
              placeholder={isRTL ? 'أدخل ملاحظاتك هنا...' : 'Enter your notes here...'}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              rows={3}
              hint={isRTL ? 'يمكنك إدخال ملاحظات إضافية' : 'You can enter additional notes'}
            />

            <Select
              label={isRTL ? 'الخيارات' : 'Options'}
              options={selectOptions}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              placeholder={isRTL ? 'اختر خياراً...' : 'Select an option...'}
            />

            <Select
              label={isRTL ? 'حالة الخطأ' : 'Error State'}
              options={selectOptions}
              placeholder={isRTL ? 'اختر خياراً...' : 'Select an option...'}
              state="error"
              error={isRTL ? 'يرجى اختيار خيار' : 'Please select an option'}
            />

            <div>
              <Checkbox
                label={isRTL ? 'أوافق على الشروط والأحكام' : 'I agree to the terms and conditions'}
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <Checkbox
                label={isRTL ? 'حالة خطأ' : 'Error State'}
                state="error"
                error={isRTL ? 'يجب الموافقة على الشروط' : 'You must agree to the terms'}
                style={{ marginTop: '0.5rem' }}
              />
            </div>

            <div>
              <RadioGroup
                name="radio-group"
                value={radioValue}
                onChange={setRadioValue}
                label={isRTL ? 'اختر خياراً' : 'Select an option'}
                orientation="vertical"
              >
                {radioOptions.map((option) => (
                  <Radio
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <RadioGroup
                name="radio-group-horizontal"
                value={radioValue}
                onChange={setRadioValue}
                label={isRTL ? 'اختر خياراً (أفقي)' : 'Select an option (Horizontal)'}
                orientation="horizontal"
              >
                {radioOptions.map((option) => (
                  <Radio
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Switch
                label={isRTL ? 'تفعيل الإشعارات' : 'Enable Notifications'}
                checked={switchChecked}
                onChange={(e) => setSwitchChecked(e.target.checked)}
                size="md"
              />
              <Switch
                label={isRTL ? 'حالة خطأ' : 'Error State'}
                state="error"
                error={isRTL ? 'يجب تفعيل الإشعارات' : 'You must enable notifications'}
                style={{ marginTop: '0.5rem' }}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={isLoading}
              leftIcon={<Save size={18} />}
            >
              {isRTL ? 'حفظ النموذج' : 'Submit Form'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setInputValue('');
                setTextareaValue('');
                setSelectValue('');
                setCheckboxChecked(false);
                setSwitchChecked(false);
                toast.toast({
                  title: isRTL ? 'تم المسح' : 'Cleared',
                  message: isRTL ? 'تم مسح جميع الحقول' : 'All fields have been cleared',
                  variant: 'info',
                });
              }}
            >
              {isRTL ? 'مسح الكل' : 'Clear All'}
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* ========================================
          MODAL
          ======================================== */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        size="md"
        closeOnOverlayClick
        closeOnEscape
      >
        <ModalHeader onClose={() => setModalOpen(false)}>
          {isRTL ? 'مرحباً بك في النافذة المنبثقة' : 'Welcome to the Modal'}
        </ModalHeader>
        <ModalBody>
          <p style={{ marginBottom: '1rem' }}>
            {isRTL
              ? 'هذه نافذة منبثقة قابلة للتخصيص. يمكنك وضع أي محتوى هنا.'
              : 'This is a customizable modal. You can put any content here.'}
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Input
              placeholder={isRTL ? 'أدخل شيئاً...' : 'Enter something...'}
              leftIcon={<User size={18} />}
            />
            <Textarea
              placeholder={isRTL ? 'أدخل ملاحظات...' : 'Enter notes...'}
              rows={3}
            />
          </div>

          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <Badge variant="primary">{isRTL ? 'وسم 1' : 'Tag 1'}</Badge>
            <Badge variant="success">{isRTL ? 'وسم 2' : 'Tag 2'}</Badge>
            <Badge variant="warning">{isRTL ? 'وسم 3' : 'Tag 3'}</Badge>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            {isRTL ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setModalOpen(false);
              toast.toast({
                title: isRTL ? 'تم الإرسال' : 'Submitted',
                message: isRTL ? 'تم إرسال البيانات بنجاح' : 'Data submitted successfully',
                variant: 'success',
              });
            }}
          >
            {isRTL ? 'تأكيد' : 'Confirm'}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Footer */}
      <div
        style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--color-border)',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm, 14px)',
        }}
      >
        <p>
          {isRTL
            ? 'جميع المكونات تدعم RTL/LTR و Dark/Light Mode'
            : 'All components support RTL/LTR and Dark/Light Mode'}
        </p>
        <p style={{ marginTop: '0.25rem' }}>
          🚀 {isRTL ? 'جاهز للاستخدام في مشروعك' : 'Ready to use in your project'}
        </p>
      </div>
    </div>
  );
};

export default PlaygroundPage;