import { useState, useRef } from 'react'
import {
  Heart, MessageCircle, Flag, Image, X, Send,
  ChevronDown, MoreHorizontal, Bell, BellOff,
  Share2, Bookmark, Copy, Check, Pencil, Trash2, CornerDownRight,
} from 'lucide-react'
import { C, T } from '../theme'

// ─── Mock current user ────────────────────────────────────────
const ME = { id: 'u0', name: 'Neeraj Balana', location: 'Anupgarh, Rajasthan' }

// ─── Mock feed ────────────────────────────────────────────────
const MOCK_POSTS = [
  {
    id: 'p1',
    user: { id: 'u1', name: 'Ramesh Verma', location: 'Hisar, Haryana' },
    text: 'Wheat crop mein yellow rust aa gayi hai, koi solution batao bhai log 🌾 Syngenta ka Amistar try kiya par zyada fark nahi pada.',
    imgs: ['https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop'],
    likes: 24,
    comments: [
      {
        id: 'c1', userId: 'u2', user: { name: 'Suresh Kumar' },
        text: 'Bhai Propiconazole 25% EC use karo, 15 din mein thik ho jayega.',
        ts: '2h ago',
        replies: [
          { id: 'r1', userId: 'u1', user: { name: 'Ramesh Verma' }, text: 'Kahan milega yaar? BeejSpray pe available hai?', ts: '1h ago', replies: [] },
          { id: 'r2', userId: 'u2', user: { name: 'Suresh Kumar' }, text: 'Haan bhai, BeejSpray pe mil jayega, main wahi se leta hoon.', ts: '45m ago', replies: [] },
        ],
      },
      {
        id: 'c2', userId: 'u3', user: { name: 'Dinesh Singh' },
        text: 'Main bhi isi problem se guzra tha, Tilt 250 EC ne kaam kiya.',
        ts: '1h ago', replies: [],
      },
    ],
    ts: '3h ago', isLiked: false, isMine: false, isFlagged: false, isSaved: false, notif: false,
  },
  {
    id: 'p2',
    user: { id: 'u2', name: 'Gurpreet Singh', location: 'Ludhiana, Punjab' },
    text: 'Is baar paddy ki fasal bahut achhi rahi! 🎉 45 quintal per acre mila. Seedling stage pe NPK aur baad mein urea diya tha.',
    imgs: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop',
    ],
    likes: 87,
    comments: [
      { id: 'c3', userId: 'u4', user: { name: 'Harjinder Pal' }, text: 'Waah bhai, kaun si variety thi?', ts: '5h ago', replies: [] },
    ],
    ts: '6h ago', isLiked: true, isMine: false, isFlagged: false, isSaved: true, notif: false,
  },
  {
    id: 'p3',
    user: { id: ME.id, name: ME.name, location: ME.location },
    text: 'Neptune 16L battery sprayer liya BeejSpray se, delivery 2 din mein aa gayi. Bahut smooth experience raha 👍',
    imgs: ['https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=600&h=400&fit=crop'],
    likes: 12,
    comments: [
      { id: 'c5', userId: ME.id, user: { name: ME.name }, text: 'Haan bilkul, 2 saal se use kar raha hoon isko.', ts: '20h ago', replies: [] },
    ],
    ts: '1d ago', isLiked: false, isMine: true, isFlagged: false, isSaved: false, notif: true,
  },
]

// ─── Tabs ─────────────────────────────────────────────────────
const TABS = [
  { key: 'feed',  label: 'My Feed'     },
  { key: 'mine',  label: 'My Posts'    },
  { key: 'saved', label: 'Saved Posts' },
]

// ─── Share apps ───────────────────────────────────────────────
const SHARE_APPS = [
  {
    label: 'WhatsApp', color: '#25D366',
    action: (link, text) => window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${link}`)}`, '_blank'),
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  },
  {
    label: 'SMS', color: '#4CAF50',
    action: (link, text) => window.open(`sms:?body=${encodeURIComponent(`${text}\n${link}`)}`, '_self'),
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>,
  },
  {
    label: 'Telegram', color: '#2AABEE',
    action: (link, text) => window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`, '_blank'),
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  },
  {
    label: 'Messenger', color: '#0084FF',
    action: (link) => window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(link)}&app_id=291494419107518`, '_blank'),
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/></svg>,
  },
  {
    label: 'Instagram', color: '#E1306C',
    action: (link, text) => { navigator.clipboard?.writeText(`${text}\n${link}`).catch(() => {}); window.open('https://www.instagram.com/direct/inbox/', '_blank') },
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
]

// ─── Avatar ───────────────────────────────────────────────────
function Avatar({ name, size = 40 }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: C.primary, color: '#fff', fontSize: size * 0.36 }}>
      {initials}
    </div>
  )
}

// ─── Image Grid ───────────────────────────────────────────────
function ImageGrid({ imgs, onPreview }) {
  if (!imgs?.length) return null
  const n = imgs.length
  const tile = (src, i, h = '100%') => (
    <div key={i} className="overflow-hidden cursor-pointer" onClick={() => onPreview(i)}>
      <img src={src} alt="" className="w-full object-cover hover:scale-105 transition-transform duration-300" style={{ height: h }} />
    </div>
  )
  if (n === 1) return <div className="mt-3 rounded-xl overflow-hidden cursor-pointer" onClick={() => onPreview(0)}><img src={imgs[0]} alt="" className="w-full object-cover rounded-xl" style={{ maxHeight: 340 }} /></div>
  if (n === 2) return <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl overflow-hidden" style={{ height: 240 }}>{imgs.map((s, i) => tile(s, i))}</div>
  if (n === 3) return <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl overflow-hidden" style={{ height: 200 }}>{imgs.map((s, i) => tile(s, i))}</div>
  return (
    <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl overflow-hidden" style={{ height: 300 }}>
      {imgs.slice(0, 4).map((s, i) => (
        <div key={i} className="overflow-hidden cursor-pointer relative" onClick={() => onPreview(i)}>
          <img src={s} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          {i === 3 && n > 4 && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-white text-xl font-bold">+{n - 4}</span></div>}
        </div>
      ))}
    </div>
  )
}

// ─── Share Modal ──────────────────────────────────────────────
function ShareModal({ post, onClose }) {
  const [copied, setCopied] = useState(false)
  const link = `https://beejspray.com/social-media/post/${post.id}`
  const text = `${post.user.name} ne BeejSpray community mein share kiya: "${post.text?.slice(0, 80)}..."`
  const copy = () => { navigator.clipboard?.writeText(link).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <>
      <div className="fixed inset-0 z-[500] bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[501] w-[300px] rounded-2xl p-5"
        style={{ backgroundColor: C.white, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[14px] font-bold" style={{ color: C.gray900 }}>Share via</p>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: C.gray100 }}>
            <X size={14} style={{ color: C.gray500 }} />
          </button>
        </div>

        {/* Icons grid */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {SHARE_APPS.map(app => (
            <button key={app.label} onClick={() => app.action(link, text)}
              className="flex flex-col items-center gap-1.5 group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 active:scale-95"
                style={{ backgroundColor: app.color }}>
                {app.icon}
              </div>
              <span className="text-[10px] font-medium leading-tight text-center"
                style={{ color: C.gray500 }}>{app.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${C.gray200}` }} className="mb-3" />

        {/* Copy link */}
        <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl"
          style={{ backgroundColor: C.gray100 }}>
          <p className="flex-1 text-[11px] truncate" style={{ color: C.gray500 }}>{link}</p>
          <button onClick={copy}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-bold flex-shrink-0 transition-all"
            style={{ backgroundColor: copied ? C.primary : C.white, color: copied ? '#fff' : C.primary, border: `1px solid ${copied ? C.primary : C.gray200}` }}>
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Comment Input ────────────────────────────────────────────
function CommentInput({ placeholder = 'Write a comment...', onSubmit, onCancel, autoFocus = false }) {
  const [text, setText] = useState('')
  const ref = useRef(null)

  // auto focus
  if (autoFocus && ref.current) setTimeout(() => ref.current?.focus(), 50)

  return (
    <div className="flex items-center gap-2">
      <Avatar name={ME.name} size={28} />
      <div className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2 border"
        style={{ borderColor: C.gray200, backgroundColor: '#fff' }}>
        <input
          ref={ref}
          autoFocus={autoFocus}
          value={text}
          onChange={e => { if (e.target.value.length <= 200) setText(e.target.value) }}
          placeholder={placeholder}
          className="flex-1 text-[13px] outline-none bg-transparent"
          style={{ color: C.gray900 }}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (text.trim()) { onSubmit(text.trim()); setText('') } } }}
        />
        <span className="text-[10px] flex-shrink-0" style={{ color: C.gray400 }}>{text.length}/200</span>
        <button onClick={() => { if (text.trim()) { onSubmit(text.trim()); setText('') } }} disabled={!text.trim()} className="flex-shrink-0 disabled:opacity-40">
          <Send size={16} style={{ color: C.primary }} />
        </button>
      </div>
      {onCancel && (
        <button onClick={onCancel} className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100">
          <X size={14} style={{ color: C.gray400 }} />
        </button>
      )}
    </div>
  )
}

// ─── Comment Item (recursive for thread) ─────────────────────
function CommentItem({ comment, depth = 0, onEdit, onDelete, onReply }) {
  const isMine       = comment.userId === ME.id
  const [editMode,   setEditMode]   = useState(false)
  const [editText,   setEditText]   = useState(comment.text)
  const [showReply,   setShowReply]   = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [showReplies, setShowReplies] = useState(true)

  const handleSaveEdit = () => {
    if (!editText.trim()) return
    onEdit(comment.id, editText.trim(), depth)
    setEditMode(false)
  }

  return (
    <div className={depth > 0 ? 'mt-2' : ''}>
      <div className="flex items-start gap-2">
        <Avatar name={comment.user.name} size={depth > 0 ? 24 : 30} />

        <div className="flex-1 min-w-0">
          {/* Bubble */}
          {editMode ? (
            // ── Edit mode ──
            <div className="rounded-xl border px-3 py-2" style={{ borderColor: C.primary, backgroundColor: '#fff', boxShadow: `0 0 0 2px ${C.primary}22` }}>
              <textarea
                autoFocus
                value={editText}
                onChange={e => { if (e.target.value.length <= 200) setEditText(e.target.value) }}
                className="w-full text-[13px] outline-none bg-transparent resize-none"
                style={{ color: C.gray900, minHeight: 56 }}
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px]" style={{ color: C.gray400 }}>{editText.length}/200</span>
                <div className="flex gap-2">
                  <button onClick={() => { setEditMode(false); setEditText(comment.text) }}
                    className="text-[12px] font-semibold px-2.5 py-1 rounded-lg border"
                    style={{ borderColor: C.gray200, color: C.gray500 }}>
                    Cancel
                  </button>
                  <button onClick={handleSaveEdit}
                    className="text-[12px] font-bold px-2.5 py-1 rounded-lg text-white"
                    style={{ backgroundColor: C.primary }}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // ── Normal bubble ──
            <div className="rounded-xl px-3 py-2 inline-block max-w-full" style={{ backgroundColor: C.primaryLight }}>
              <p className="text-[12px] font-bold" style={{ color: C.gray900 }}>{comment.user.name}</p>
              <p className="text-[13px] mt-0.5 leading-snug" style={{ color: C.gray800 }}>{comment.text}</p>
            </div>
          )}

          {/* Action row below bubble */}
          {!editMode && (
            <div className="flex items-center gap-3 mt-1 ml-1">
              <span className="text-[11px]" style={{ color: C.gray400 }}>{comment.ts}</span>

              {/* Reply — always visible, but only on depth 0 */}
              {depth === 0 && (
                <button onClick={() => setShowReply(o => !o)}
                  className="text-[12px] font-bold transition-colors"
                  style={{ color: showReply ? C.primary : C.gray500 }}>
                  Reply
                </button>
              )}

              {/* 3-dot — own comments only */}
              {isMine && (
                <div className="relative">
                  <button onClick={() => setMenuOpen(o => !o)}
                    className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <MoreHorizontal size={13} style={{ color: C.gray400 }} />
                  </button>
                  {menuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                      <div className="absolute left-0 top-full mt-1 z-20 rounded-xl overflow-hidden"
                        style={{ border: `1px solid ${C.gray200}`, backgroundColor: C.white, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 130 }}>
                        <button onClick={() => { setEditMode(true); setMenuOpen(false) }}
                          className="w-full text-left px-3 py-2.5 text-[13px] hover:bg-gray-50 flex items-center gap-2"
                          style={{ color: C.gray800 }}>
                          <Pencil size={13} /> Edit
                        </button>
                        <button onClick={() => { onDelete(comment.id, depth); setMenuOpen(false) }}
                          className="w-full text-left px-3 py-2.5 text-[13px] hover:bg-red-50 flex items-center gap-2"
                          style={{ color: C.red }}>
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Reply input */}
          {showReply && (
            <div className="mt-2">
              <CommentInput
                placeholder={`Reply to ${comment.user.name}...`}
                autoFocus
                onSubmit={(text) => { onReply(comment.id, text); setShowReply(false) }}
                onCancel={() => setShowReply(false)}
              />
            </div>
          )}

          {/* ── Threaded replies ── */}
          {comment.replies?.length > 0 && (
            <div className="mt-2.5">
              {/* Toggle button */}
              <button
                onClick={() => setShowReplies(o => !o)}
                className="flex items-center gap-1.5 mb-2 transition-colors"
                style={{ color: C.primary }}
              >
                <CornerDownRight size={12} />
                <span className="text-[12px] font-bold">
                  {showReplies
                    ? 'Hide Replies'
                    : `Show All ${comment.replies.length} ${comment.replies.length === 1 ? 'Reply' : 'Replies'}`}
                </span>
              </button>

              {/* Replies */}
              {showReplies && (
                <div className="pl-3 flex flex-col gap-2.5"
                  style={{ borderLeft: `2px solid ${C.gray200}` }}>
                  {comment.replies.map(reply => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      depth={depth + 1}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onReply={onReply}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Post Card ────────────────────────────────────────────────
function PostCard({ post, onLike, onSave, onFlag, onToggleNotif, onDelete, onShare }) {
  const [showComments, setShowComments] = useState(false)
  const [comments,     setComments]     = useState(post.comments)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [previewIdx,   setPreviewIdx]   = useState(null)
  const [flagConfirm,  setFlagConfirm]  = useState(false)

  // ── Comment handlers ─────────────────────────────────────
  const addComment = (text) => {
    setComments(p => [...p, {
      id: `c-${Date.now()}`, userId: ME.id, user: { name: ME.name },
      text, ts: 'Just now', replies: [],
    }])
  }

  // Works for both top-level comments and replies (depth tells us where to look)
  const editComment = (id, newText, depth) => {
    setComments(prev => prev.map(c => {
      if (depth === 0 && c.id === id) return { ...c, text: newText }
      return { ...c, replies: c.replies.map(r => r.id === id ? { ...r, text: newText } : r) }
    }))
  }

  const deleteComment = (id, depth) => {
    setComments(prev =>
      depth === 0
        ? prev.filter(c => c.id !== id)
        : prev.map(c => ({ ...c, replies: c.replies.filter(r => r.id !== id) }))
    )
  }

  const addReply = (parentId, text) => {
    setComments(prev => prev.map(c =>
      c.id === parentId
        ? { ...c, replies: [...c.replies, { id: `r-${Date.now()}`, userId: ME.id, user: { name: ME.name }, text, ts: 'Just now', replies: [] }] }
        : c
    ))
  }

  const totalCount = comments.reduce((n, c) => n + 1 + (c.replies?.length ?? 0), 0)

  return (
    <div className={`${T.card} p-4`} style={{ borderRadius: 16 }}>

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={post.user.name} size={42} />
          <div>
            <p className="text-[14px] font-bold" style={{ color: C.gray900 }}>{post.user.name}</p>
            <p className="text-[11px]" style={{ color: C.gray400 }}>{post.user.location} · {post.ts}</p>
          </div>
        </div>

        {/* 3-dot */}
        <div className="relative">
          <button onClick={() => setMenuOpen(o => !o)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <MoreHorizontal size={18} style={{ color: C.gray400 }} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 z-20 rounded-xl overflow-hidden"
                style={{ border: `1px solid ${C.gray200}`, backgroundColor: C.white, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 200 }}>
                <button onClick={() => { onSave(post.id); setMenuOpen(false) }}
                  className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-gray-50 flex items-center gap-2.5"
                  style={{ color: C.gray800 }}>
                  <Bookmark size={15} fill={post.isSaved ? C.primary : 'none'} stroke={post.isSaved ? C.primary : 'currentColor'} />
                  {post.isSaved ? 'Remove from Saved' : 'Save Post'}
                </button>
                {post.isMine ? (
                  <>
                    <button onClick={() => { onToggleNotif(post.id); setMenuOpen(false) }}
                      className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-gray-50 flex items-center gap-2.5"
                      style={{ color: C.gray800 }}>
                      {post.notif ? <BellOff size={15} style={{ color: C.accent }} /> : <Bell size={15} style={{ color: C.primary }} />}
                      <div className="flex flex-col">
                        <span>{post.notif ? 'Turn off notifications' : 'Turn on notifications'}</span>
                        <span className="text-[11px]" style={{ color: C.gray400 }}>Likes & comments on this post</span>
                      </div>
                    </button>
                    <div style={{ borderTop: `1px solid ${C.gray200}` }}>
                      <button onClick={() => { onDelete(post.id); setMenuOpen(false) }}
                        className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-red-50 flex items-center gap-2.5"
                        style={{ color: C.red }}>
                        <X size={15} /> Delete Post
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ borderTop: `1px solid ${C.gray200}` }}>
                    <button onClick={() => { if (!post.isFlagged) setFlagConfirm(true); setMenuOpen(false) }}
                      disabled={post.isFlagged}
                      className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-red-50 flex items-center gap-2.5 disabled:opacity-50"
                      style={{ color: post.isFlagged ? C.gray400 : C.red }}>
                      <Flag size={15} />
                      <div className="flex flex-col">
                        <span>{post.isFlagged ? 'Already Reported' : 'Report Post'}</span>
                        <span className="text-[11px]" style={{ color: C.gray400 }}>Send to admin for review</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      {post.text && <p className="mt-3 text-[14px] leading-relaxed" style={{ color: C.gray800 }}>{post.text}</p>}
      <ImageGrid imgs={post.imgs} onPreview={setPreviewIdx} />

      {/* ── Action bar ── */}
      <div className="flex items-center gap-1 mt-4 pt-3" style={{ borderTop: `1px solid ${C.gray200}` }}>
        <button onClick={() => onLike(post.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50"
          style={{ color: post.isLiked ? C.red : C.gray500 }}>
          <Heart size={17} fill={post.isLiked ? C.red : 'none'} stroke={post.isLiked ? C.red : C.gray500} strokeWidth={2} />
          {post.likes + (post.isLiked ? 1 : 0)}
        </button>

        <button onClick={() => setShowComments(o => !o)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50"
          style={{ color: showComments ? C.primary : C.gray500 }}>
          <MessageCircle size={17} strokeWidth={2} />
          {totalCount > 0 ? totalCount : ''}
        </button>

        <button onClick={() => onShare(post.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50"
          style={{ color: C.gray500 }}>
          <Share2 size={16} strokeWidth={2} />
          Share
        </button>

        <button onClick={() => onSave(post.id)}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50"
          title={post.isSaved ? 'Saved' : 'Save'}>
          <Bookmark size={17} strokeWidth={2}
            fill={post.isSaved ? C.primary : 'none'}
            stroke={post.isSaved ? C.primary : C.gray400}
            style={{ transition: 'fill .2s, stroke .2s' }} />
        </button>
      </div>

      {/* ── Flag confirm ── */}
      {flagConfirm && (
        <div className="mt-3 px-3 py-2.5 rounded-xl flex items-center justify-between gap-3"
          style={{ backgroundColor: '#FFF0E0', border: `1px solid ${C.accentLight}` }}>
          <p className="text-[12px] font-semibold" style={{ color: C.accent }}>Report this post to admin?</p>
          <div className="flex gap-2">
            <button className="text-[12px] font-bold px-3 py-1 rounded-lg"
              style={{ backgroundColor: C.accent, color: '#fff' }}
              onClick={() => { onFlag(post.id); setFlagConfirm(false) }}>
              Yes, Report
            </button>
            <button className="text-[12px] font-semibold px-3 py-1 rounded-lg border"
              style={{ borderColor: C.gray200, color: C.gray600 }}
              onClick={() => setFlagConfirm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Comments section ── */}
      {showComments && (
        <div className="mt-4 pt-3 flex flex-col gap-3" style={{ borderTop: `1px solid ${C.gray200}` }}>
          {/* Thread list */}
          {comments.map(c => (
            <CommentItem
              key={c.id}
              comment={c}
              depth={0}
              onEdit={editComment}
              onDelete={deleteComment}
              onReply={addReply}
            />
          ))}

          {/* New comment input */}
          <div className="mt-1">
            <CommentInput onSubmit={addComment} />
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      {previewIdx !== null && (
        <div className="fixed inset-0 z-[1000] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setPreviewIdx(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
            onClick={() => setPreviewIdx(null)}>
            <X size={20} color="#fff" />
          </button>
          <img src={post.imgs[previewIdx]} alt=""
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
            onClick={e => e.stopPropagation()} />
          {post.imgs.length > 1 && (
            <>
              <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                onClick={e => { e.stopPropagation(); setPreviewIdx(i => (i - 1 + post.imgs.length) % post.imgs.length) }}>
                <ChevronDown size={20} color="#fff" className="-rotate-90" />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                onClick={e => { e.stopPropagation(); setPreviewIdx(i => (i + 1) % post.imgs.length) }}>
                <ChevronDown size={20} color="#fff" className="rotate-90" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Create Post ──────────────────────────────────────────────
function CreatePost({ onPost }) {
  const [text,     setText]     = useState('')
  const [imgs,     setImgs]     = useState([])
  const [expanded, setExpanded] = useState(false)
  const fileRef = useRef(null)

  const handleImgAdd = (e) => {
    const files  = Array.from(e.target.files || [])
    const remain = 4 - imgs.length
    files.slice(0, remain).forEach(f => {
      const r = new FileReader()
      r.onload = ev => setImgs(p => [...p, ev.target.result])
      r.readAsDataURL(f)
    })
    e.target.value = ''
  }

  const handlePost = () => {
    if (!text.trim() && !imgs.length) return
    onPost({ text: text.trim(), imgs })
    setText(''); setImgs([]); setExpanded(false)
  }

  return (
    <div className={`${T.card} p-4`} style={{ borderRadius: 16 }}>
      <div className="flex items-start gap-3">
        <Avatar name={ME.name} size={40} />
        <div className="flex-1 flex flex-col gap-3">
          <div className="rounded-xl border px-3 py-2.5"
            style={{ borderColor: expanded ? C.primary : C.gray200, backgroundColor: C.pageBg, boxShadow: expanded ? `0 0 0 2px ${C.primary}22` : 'none', transition: 'border-color .2s,box-shadow .2s' }}
            onClick={() => setExpanded(true)}>
            <textarea value={text}
              onChange={e => { if (e.target.value.length <= 500) setText(e.target.value) }}
              placeholder="Kuch share karo... fasal update, koi sawaal, farming tip 🌾"
              className="w-full text-[14px] outline-none bg-transparent resize-none"
              style={{ color: C.gray900, minHeight: expanded ? 80 : 40, lineHeight: 1.5 }}
              onFocus={() => setExpanded(true)} />
            {expanded && <div className="flex justify-end mt-1"><span className="text-[11px]" style={{ color: text.length > 450 ? C.accent : C.gray400 }}>{text.length}/500</span></div>}
          </div>

          {imgs.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {imgs.map((src, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden" style={{ width: 72, height: 72 }}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => setImgs(p => p.filter((_, j) => j !== i))}
                    className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center">
                    <X size={11} color="#fff" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between flex-wrap gap-2">
            <button onClick={() => fileRef.current?.click()} disabled={imgs.length >= 4}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold border transition-colors disabled:opacity-40"
              style={{ borderColor: C.gray200, color: C.gray600 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.gray200; e.currentTarget.style.color = C.gray600 }}>
              <Image size={15} /> Photo {imgs.length > 0 && `(${imgs.length}/4)`}
            </button>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImgAdd} />
            <button onClick={handlePost} disabled={!text.trim() && !imgs.length}
              className="px-5 py-1.5 rounded-lg text-[13px] font-bold text-white transition-all disabled:opacity-40"
              style={{ backgroundColor: C.primary }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryDark}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = C.primary}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────
function EmptyState({ tab }) {
  const map = {
    feed:  { emoji: '🌱', title: 'Koi post nahi abhi',          sub: 'Pehla post karo aur community shuru karo!' },
    mine:  { emoji: '✍️', title: 'Tumne abhi kuch post nahi kiya', sub: 'Apna pehla post upar se karo!'        },
    saved: { emoji: '🔖', title: 'Koi saved post nahi',          sub: 'Post pe bookmark icon dabao save karne ke liye.' },
  }
  const { emoji, title, sub } = map[tab] || map.feed
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <span className="text-5xl">{emoji}</span>
      <p className="text-base font-semibold" style={{ color: C.gray700 }}>{title}</p>
      <p className="text-sm text-center" style={{ color: C.gray400 }}>{sub}</p>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────
export default function SocialMedia() {
  const [posts,     setPosts]     = useState(MOCK_POSTS)
  const [activeTab, setActiveTab] = useState('feed')
  const [sharePost, setSharePost] = useState(null)

  const handlePost        = ({ text, imgs }) => setPosts(p => [{ id: `p-${Date.now()}`, user: { id: ME.id, name: ME.name, location: ME.location }, text, imgs, likes: 0, comments: [], ts: 'Just now', isLiked: false, isMine: true, isFlagged: false, isSaved: false, notif: true }, ...p])
  const handleLike        = id => setPosts(p => p.map(x => x.id === id ? { ...x, isLiked: !x.isLiked } : x))
  const handleSave        = id => setPosts(p => p.map(x => x.id === id ? { ...x, isSaved: !x.isSaved } : x))
  const handleFlag        = id => setPosts(p => p.map(x => x.id === id ? { ...x, isFlagged: true } : x))
  const handleToggleNotif = id => setPosts(p => p.map(x => x.id === id ? { ...x, notif: !x.notif } : x))
  const handleDelete      = id => setPosts(p => p.filter(x => x.id !== id))
  const handleShare       = id => setSharePost(posts.find(x => x.id === id) || null)

  const visible = posts.filter(p => activeTab === 'mine' ? p.isMine : activeTab === 'saved' ? p.isSaved : true)

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.pageBg }}>
      <div className="max-w-[680px] mx-auto px-4 py-6">

        <div className="mb-4">
          <h1 className="text-2xl font-bold" style={{ color: C.gray900 }}>Social Media</h1>
          <p className="text-sm mt-0.5" style={{ color: C.gray400 }}>Farmer-to-farmer community · Chronological feed</p>
        </div>

        {/* ── Tabs ── */}
        <div className="flex rounded-xl overflow-hidden border mb-5" style={{ borderColor: C.gray200 }}>
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2.5 text-[13px] font-semibold transition-colors"
              style={{ backgroundColor: activeTab === tab.key ? C.primary : C.white, color: activeTab === tab.key ? '#fff' : C.gray600, borderRight: tab.key !== 'saved' ? `1px solid ${C.gray200}` : 'none' }}>
              {tab.label}
              {tab.key === 'saved' && posts.filter(p => p.isSaved).length > 0 && (
                <span className="ml-1.5 text-[11px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: activeTab === 'saved' ? 'rgba(255,255,255,0.3)' : C.primaryLight, color: activeTab === 'saved' ? '#fff' : C.primary }}>
                  {posts.filter(p => p.isSaved).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'feed' && <div className="mb-5"><CreatePost onPost={handlePost} /></div>}

        <div className="flex flex-col gap-4">
          {visible.length === 0
            ? <EmptyState tab={activeTab} />
            : visible.map(post => (
                <PostCard key={post.id} post={post}
                  onLike={handleLike} onSave={handleSave} onFlag={handleFlag}
                  onToggleNotif={handleToggleNotif} onDelete={handleDelete} onShare={handleShare} />
              ))}
        </div>
      </div>

      {sharePost && <ShareModal post={sharePost} onClose={() => setSharePost(null)} />}
    </div>
  )
}