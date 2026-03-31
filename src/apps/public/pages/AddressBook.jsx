import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Plus, Pencil, Trash2, CheckCircle2, ChevronLeft, X, Home, Briefcase, MoreHorizontal } from 'lucide-react'
import { C, T } from '../theme'

// ─── Mock data — same shape as Checkout.jsx ──────────────────
const INITIAL = [
  {
    id: 1, tag: 'Home',
    name: 'Neeraj Balana', mobile: '9876543210',
    line1: 'Ward No. 12, Near Govt School', line2: '',
    city: 'Anupgarh', state: 'Rajasthan', pincode: '335701',
    isDefault: true,
  },
  {
    id: 2, tag: 'Work',
    name: 'Neeraj Balana', mobile: '9876543210',
    line1: 'Shop No. 4, Main Market', line2: 'Ground Floor',
    city: 'Anupgarh', state: 'Rajasthan', pincode: '335701',
    isDefault: false,
  },
]

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
]

const TAGS = ['Home', 'Work', 'Other']

const EMPTY_FORM = { tag: 'Home', name: '', mobile: '', line1: '', line2: '', city: '', state: '', pincode: '' }

// ─── Input field ─────────────────────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[13px] font-semibold" style={{ color: C.gray700 }}>
        {label}{required && <span style={{ color: C.red }}> *</span>}
      </label>
      {children}
      {error && <p className="text-[11px] font-medium" style={{ color: C.red }}>{error}</p>}
    </div>
  )
}

function Input({ value, onChange, placeholder, type = 'text', maxLength }) {
  return (
    <input
      type={type} value={value} onChange={onChange}
      placeholder={placeholder} maxLength={maxLength}
      className="w-full px-3 py-2.5 rounded-xl text-[13px] outline-none transition-all"
      style={{ border: `1.5px solid ${C.gray200}`, color: C.gray900, backgroundColor: '#fff' }}
      onFocus={e => e.currentTarget.style.borderColor = C.primary}
      onBlur={e => e.currentTarget.style.borderColor = C.gray200}
    />
  )
}

// ─── Address Form (Add / Edit) ────────────────────────────────
function AddressForm({ initial = EMPTY_FORM, onSave, onCancel, title = 'Add New Address' }) {
  const [form,   setForm]   = useState({ ...EMPTY_FORM, ...initial })
  const [errors, setErrors] = useState({})

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.name.trim())              e.name    = 'Name is required'
    if (!/^\d{10}$/.test(form.mobile))  e.mobile  = 'Enter valid 10-digit mobile'
    if (!form.line1.trim())             e.line1   = 'Address is required'
    if (!form.city.trim())              e.city    = 'City is required'
    if (!form.state)                    e.state   = 'Select a state'
    if (!/^\d{6}$/.test(form.pincode))  e.pincode = 'Enter valid 6-digit pincode'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = () => { if (validate()) onSave(form) }

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={onCancel}>
      <div
        className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col"
        style={{ backgroundColor: C.white, maxHeight: '92vh', boxShadow: '0 -8px 40px rgba(0,0,0,0.18)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: `1px solid ${C.gray200}` }}>
          <p className="text-[16px] font-bold" style={{ color: C.gray900 }}>{title}</p>
          <button onClick={onCancel} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
            <X size={16} style={{ color: C.gray500 }} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-4">

          {/* Tag selector */}
          <Field label="Address Type">
            <div className="flex gap-2">
              {TAGS.map(tag => (
                <button key={tag} onClick={() => set('tag', tag)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-semibold transition-all"
                  style={{
                    backgroundColor: form.tag === tag ? C.primary : '#fff',
                    color:           form.tag === tag ? '#fff' : C.gray600,
                    borderColor:     form.tag === tag ? C.primary : C.gray200,
                  }}>
                  {tag === 'Home'  && <Home      size={13} />}
                  {tag === 'Work'  && <Briefcase size={13} />}
                  {tag === 'Other' && <MapPin    size={13} />}
                  {tag}
                </button>
              ))}
            </div>
          </Field>

          {/* Name + Mobile */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full Name" required error={errors.name}>
              <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full name" />
            </Field>
            <Field label="Mobile" required error={errors.mobile}>
              <Input value={form.mobile} onChange={e => set('mobile', e.target.value.replace(/\D/g, ''))} placeholder="10-digit number" maxLength={10} type="tel" />
            </Field>
          </div>

          {/* Address lines */}
          <Field label="Address Line 1" required error={errors.line1}>
            <Input value={form.line1} onChange={e => set('line1', e.target.value)} placeholder="House / Plot no., Street, Village" />
          </Field>
          <Field label="Address Line 2">
            <Input value={form.line2} onChange={e => set('line2', e.target.value)} placeholder="Landmark, Area (optional)" />
          </Field>

          {/* City + Pincode */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="City" required error={errors.city}>
              <Input value={form.city} onChange={e => set('city', e.target.value)} placeholder="City / Town" />
            </Field>
            <Field label="Pincode" required error={errors.pincode}>
              <Input value={form.pincode} onChange={e => set('pincode', e.target.value.replace(/\D/g, ''))} placeholder="6-digit pincode" maxLength={6} type="tel" />
            </Field>
          </div>

          {/* State */}
          <Field label="State" required error={errors.state}>
            <select
              value={form.state}
              onChange={e => set('state', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-[13px] outline-none transition-all appearance-none"
              style={{ border: `1.5px solid ${errors.state ? C.red : C.gray200}`, color: form.state ? C.gray900 : C.gray400, backgroundColor: '#fff' }}
              onFocus={e => e.currentTarget.style.borderColor = C.primary}
              onBlur={e => e.currentTarget.style.borderColor = errors.state ? C.red : C.gray200}
            >
              <option value="">Select state</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex gap-3 flex-shrink-0" style={{ borderTop: `1px solid ${C.gray200}` }}>
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-[14px] font-semibold border transition-colors"
            style={{ borderColor: C.gray200, color: C.gray600 }}>
            Cancel
          </button>
          <button onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl text-[14px] font-bold text-white transition-colors"
            style={{ backgroundColor: C.primary }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryDark}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = C.primary}>
            Save Address
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Address Card ─────────────────────────────────────────────
function AddressCard({ addr, onEdit, onDelete, onSetDefault }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-white rounded-2xl p-4 relative"
      style={{ border: `1.5px solid ${addr.isDefault ? C.primary : C.gray200}`, boxShadow: addr.isDefault ? `0 0 0 3px ${C.primary}18` : '0 1px 4px rgba(0,0,0,0.06)' }}>

      {/* Tag + Default badge row */}
      <div className="flex items-center gap-2 mb-2">
        <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: C.primaryLight, color: C.primary }}>
          {addr.tag === 'Home'  && <Home      size={10} />}
          {addr.tag === 'Work'  && <Briefcase size={10} />}
          {addr.tag === 'Other' && <MapPin    size={10} />}
          {addr.tag}
        </span>
        {addr.isDefault && (
          <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: C.primary, color: '#fff' }}>
            <CheckCircle2 size={10} /> Default
          </span>
        )}
      </div>

      {/* Address text */}
      <p className="text-[14px] font-bold leading-snug" style={{ color: C.gray900 }}>{addr.name}</p>
      <p className="text-[13px] mt-0.5" style={{ color: C.gray500 }}>+91 {addr.mobile}</p>
      <p className="text-[13px] mt-1 leading-relaxed" style={{ color: C.gray700 }}>
        {[addr.line1, addr.line2, addr.city, addr.state, addr.pincode].filter(Boolean).join(', ')}
      </p>

      {/* 3-dot menu */}
      <div className="absolute top-3 right-3">
        <button onClick={() => setMenuOpen(o => !o)}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
          <MoreHorizontal size={16} style={{ color: C.gray400 }} />
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-full mt-1 z-20 rounded-xl overflow-hidden"
              style={{ border: `1px solid ${C.gray200}`, backgroundColor: C.white, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 170 }}>
              {!addr.isDefault && (
                <button onClick={() => { onSetDefault(addr.id); setMenuOpen(false) }}
                  className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-gray-50 flex items-center gap-2.5 transition-colors"
                  style={{ color: C.gray800 }}>
                  <CheckCircle2 size={14} style={{ color: C.primary }} /> Set as Default
                </button>
              )}
              <button onClick={() => { onEdit(addr); setMenuOpen(false) }}
                className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-gray-50 flex items-center gap-2.5 transition-colors"
                style={{ color: C.gray800 }}>
                <Pencil size={14} /> Edit Address
              </button>
              <div style={{ borderTop: `1px solid ${C.gray200}` }}>
                <button onClick={() => { onDelete(addr.id); setMenuOpen(false) }}
                  className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                  style={{ color: C.red }}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Delete confirm modal ─────────────────────────────────────
function DeleteConfirm({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={onCancel}>
      <div className="w-full max-w-sm rounded-2xl p-5 bg-white"
        style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.18)' }}
        onClick={e => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ backgroundColor: '#FEE2E2' }}>
          <Trash2 size={22} style={{ color: C.red }} />
        </div>
        <p className="text-[16px] font-bold text-center mb-1" style={{ color: C.gray900 }}>Delete Address?</p>
        <p className="text-[13px] text-center mb-5" style={{ color: C.gray500 }}>
          This address will be permanently removed from your account.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-[14px] font-semibold border"
            style={{ borderColor: C.gray200, color: C.gray600 }}>
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-[14px] font-bold text-white"
            style={{ backgroundColor: C.red }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────
export default function AddressBook() {
  const navigate = useNavigate()
  const [addresses,    setAddresses]    = useState(INITIAL)
  const [showForm,     setShowForm]     = useState(false)
  const [editTarget,   setEditTarget]   = useState(null)   // address obj being edited
  const [deleteTarget, setDeleteTarget] = useState(null)   // id to delete

  const handleAdd = (form) => {
    const newAddr = { ...form, id: Date.now(), isDefault: addresses.length === 0 }
    setAddresses(p => [...p, newAddr])
    setShowForm(false)
  }

  const handleEdit = (form) => {
    setAddresses(p => p.map(a => a.id === editTarget.id ? { ...a, ...form } : a))
    setEditTarget(null)
  }

  const handleDelete = () => {
    setAddresses(p => {
      const filtered = p.filter(a => a.id !== deleteTarget)
      // if deleted was default, make first remaining one default
      if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
        filtered[0] = { ...filtered[0], isDefault: true }
      }
      return filtered
    })
    setDeleteTarget(null)
  }

  const handleSetDefault = (id) => {
    setAddresses(p => p.map(a => ({ ...a, isDefault: a.id === id })))
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6" style={{ backgroundColor: C.pageBg }}>

      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/account')}
          className="w-9 h-9 rounded-xl flex items-center justify-center border transition-colors hover:bg-gray-50"
          style={{ borderColor: C.gray200 }}>
          <ChevronLeft size={20} style={{ color: C.gray700 }} />
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: C.gray900 }}>My Addresses</h1>
          <p className="text-[12px]" style={{ color: C.gray400 }}>
            {addresses.length} saved {addresses.length === 1 ? 'address' : 'addresses'}
          </p>
        </div>
      </div>

      {/* ── Address list ── */}
      <div className="flex flex-col gap-3 mb-4">
        {addresses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: C.primaryLight }}>
              <MapPin size={30} style={{ color: C.primary }} strokeWidth={1.5} />
            </div>
            <p className="text-base font-semibold" style={{ color: C.gray700 }}>No saved addresses</p>
            <p className="text-sm text-center" style={{ color: C.gray400 }}>
              Add a delivery address to speed up checkout.
            </p>
          </div>
        )}

        {addresses.map(addr => (
          <AddressCard
            key={addr.id}
            addr={addr}
            onEdit={a => setEditTarget(a)}
            onDelete={id => setDeleteTarget(id)}
            onSetDefault={handleSetDefault}
          />
        ))}
      </div>

      {/* ── Add new button ── */}
      {addresses.length < 5 && (
        <button onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed text-[14px] font-semibold transition-all"
          style={{ borderColor: C.primary, color: C.primary, backgroundColor: 'transparent' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryLight}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
          <Plus size={18} />
          Add New Address
        </button>
      )}
      {addresses.length >= 5 && (
        <p className="text-center text-[12px] py-2" style={{ color: C.gray400 }}>
          Maximum 5 addresses allowed.
        </p>
      )}

      {/* ── Add form modal ── */}
      {showForm && (
        <AddressForm
          title="Add New Address"
          onSave={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* ── Edit form modal ── */}
      {editTarget && (
        <AddressForm
          title="Edit Address"
          initial={editTarget}
          onSave={handleEdit}
          onCancel={() => setEditTarget(null)}
        />
      )}

      {/* ── Delete confirm ── */}
      {deleteTarget && (
        <DeleteConfirm
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}