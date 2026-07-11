'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, Save, ImagePlus } from 'lucide-react'
import { SEEDED_CATEGORIES, SEEDED_PRODUCTS } from '@/lib/api/mockData'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EditableProduct {
  id: string
  name: string
  category_id: string
  price: number
  stock: number
  description: string
  tags: string[]
  image_url: string
  thumbnails: string[]
  slug: string
  units_sold?: number
  rating?: number
  review_count?: number
  original_price?: number
}

interface Props {
  product: EditableProduct | null
  onClose: () => void
  onSave: (updated: EditableProduct) => void
  onDelete: (id: string) => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const pillInput =
  'w-full h-10 rounded-[9999px] border border-[#ebebeb] bg-white px-4 text-sm text-[#000] outline-none focus:border-[#5433eb] focus:ring-2 focus:ring-[#5433eb]/20 transition-all'

const fieldLabel =
  'block text-xs font-semibold uppercase tracking-wider text-[#787574] mb-1.5'

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductDeepEditDrawer({ product, onClose, onSave, onDelete }: Props) {
  const [form, setForm] = useState<EditableProduct | null>(null)
  const [newImageUrl, setNewImageUrl] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Initialise form when a product is opened
  useEffect(() => {
    if (product) {
      setForm({ ...product })
      setNewImageUrl('')
      setTagInput('')
      setSaveSuccess(false)
      setConfirmDelete(false)
      setDeleting(false)
    }
  }, [product])

  if (!form) return null

  const isSeeded = SEEDED_PRODUCTS.some((p) => p.id === form.id)

  // ─── Field helpers ──────────────────────────────────────────────────────────
  const set = (key: keyof EditableProduct, value: any) => setForm((f) => f ? { ...f, [key]: value } : f)

  const addImage = () => {
    const url = newImageUrl.trim()
    if (!url) return
    const next = [...(form.thumbnails || []), url]
    setForm((f) => f ? { ...f, thumbnails: next, image_url: next[0] } : f)
    setNewImageUrl('')
  }

  const removeImage = (idx: number) => {
    const next = form.thumbnails.filter((_, i) => i !== idx)
    setForm((f) => f ? { ...f, thumbnails: next, image_url: next[0] || '' } : f)
  }

  const addTag = () => {
    const t = tagInput.trim().toLowerCase()
    if (!t || form.tags.includes(t)) return
    set('tags', [...form.tags, t])
    setTagInput('')
  }

  const removeTag = (tag: string) => set('tags', form.tags.filter((t) => t !== tag))

  // ─── Save ────────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.name.trim() || form.price <= 0) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 300)) // slight pulse for feedback
    onSave(form)
    setSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2500)
  }

  // ─── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return }
    setDeleting(true)
    await new Promise((r) => setTimeout(r, 300))
    onDelete(form.id)
    setDeleting(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: '100%', opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
            style={{
              width: 'min(520px, 96vw)',
              background: '#ffffff',
              borderRadius: '28px 0 0 28px',
              boxShadow: 'rgba(0,0,0,0.10) 0px 4px 6px -1px, rgba(0,0,0,0.10) 0px 2px 4px -2px, rgba(0,0,0,0.06) -4px 0 24px 0',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-5 border-b border-[#ebebeb] shrink-0">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#787574]">Deep Edit</p>
                <h2 className="text-xl font-semibold text-[#000] mt-0.5 line-clamp-1">{form.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#f2f4f5] transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5 text-[#787574]" />
              </button>
            </div>

            {/* Scrollable body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-7">

              {/* Seeded product notice */}
              {isSeeded && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-2xl">
                  ⚡ This is a seeded catalog product. Changes will persist in this browser session only.
                </div>
              )}

              {/* ── Basic info ── */}
              <section className="space-y-4">
                <div>
                  <label className={fieldLabel}>Product Name</label>
                  <input
                    className={pillInput}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="e.g. Sony WH-1000XM6"
                  />
                </div>

                <div>
                  <label className={fieldLabel}>Category</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => set('category_id', e.target.value)}
                    className={cn(pillInput, 'cursor-pointer')}
                  >
                    {SEEDED_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={fieldLabel}>Price ($)</label>
                    <input
                      className={pillInput}
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => set('price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <label className={fieldLabel}>Stock Count</label>
                    <input
                      className={pillInput}
                      type="number"
                      min="0"
                      value={form.stock}
                      onChange={(e) => set('stock', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div>
                  <label className={fieldLabel}>Description</label>
                  <textarea
                    className="w-full rounded-2xl border border-[#ebebeb] bg-white px-4 py-3 text-sm text-[#000] outline-none focus:border-[#5433eb] focus:ring-2 focus:ring-[#5433eb]/20 transition-all resize-none"
                    rows={4}
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Detailed product description..."
                  />
                </div>
              </section>

              {/* ── Tags ── */}
              <section>
                <label className={fieldLabel}>Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 bg-[#f2f4f5] text-[#332f2d] text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    className={cn(pillInput, 'flex-1')}
                    placeholder="Add tag, press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                  />
                  <button
                    onClick={addTag}
                    className="px-4 h-10 bg-[#f2f4f5] hover:bg-[#ebebeb] text-sm font-medium rounded-full transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </section>

              {/* ── Image Manager ── */}
              <section>
                <label className={fieldLabel}>Images ({form.thumbnails.length})</label>

                {/* Image preview strip */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {form.thumbnails.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`img-${idx}`}
                        className="w-20 h-20 object-cover rounded-2xl border border-[#ebebeb]"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=80&h=80&fit=crop' }}
                      />
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 bg-[#5433eb] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">MAIN</span>
                      )}
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        aria-label="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {form.thumbnails.length === 0 && (
                    <div className="w-20 h-20 bg-[#f2f4f5] rounded-2xl border border-dashed border-[#cccccc] flex items-center justify-center">
                      <ImagePlus className="w-5 h-5 text-[#cccccc]" />
                    </div>
                  )}
                </div>

                {/* Add image URL */}
                <div className="flex gap-2">
                  <input
                    className={cn(pillInput, 'flex-1 text-xs')}
                    placeholder="https://images.unsplash.com/..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImage() } }}
                  />
                  <button
                    onClick={addImage}
                    className="px-4 h-10 bg-[#f2f4f5] hover:bg-[#ebebeb] text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <ImagePlus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                <p className="text-[11px] text-[#787574] mt-2">First image is used as the primary product photo.</p>
              </section>

            </div>

            {/* Footer Actions */}
            <div className="shrink-0 px-8 pb-8 pt-5 border-t border-[#ebebeb] space-y-3">
              {/* Save success flash */}
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2.5 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    Changes saved to catalog.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Primary: Save */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full h-11 rounded-[9999px] bg-[#5433eb] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#4526d6] active:scale-[0.98] transition-all disabled:opacity-60"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>

              {/* Danger: Delete */}
              <button
                onClick={handleDelete}
                disabled={deleting || isSeeded}
                className={cn(
                  'w-full h-11 rounded-[9999px] border text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]',
                  confirmDelete
                    ? 'border-red-400 bg-red-50 text-red-600 hover:bg-red-100'
                    : 'border-[#ebebeb] bg-white text-red-500 hover:border-red-200 hover:bg-red-50',
                  (deleting || isSeeded) && 'opacity-40 cursor-not-allowed'
                )}
              >
                {deleting ? (
                  <span className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                {isSeeded
                  ? 'Cannot delete seeded products'
                  : confirmDelete
                  ? 'Tap again to confirm delete'
                  : 'Delete Product'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
