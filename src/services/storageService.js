import { INITIAL_PCB_LIBRARY } from '../data/mockPcbData';

const STORAGE_KEY = 'pcb_vision_library_v3';

export const storageService = {
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PCB_LIBRARY));
        return INITIAL_PCB_LIBRARY;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('LocalStorage okuma hatası:', error);
      return INITIAL_PCB_LIBRARY;
    }
  },

  getById(id) {
    const list = this.getAll();
    return list.find(item => item.id === id) || null;
  },

  create(newPcb) {
    const list = this.getAll();
    const record = {
      ...newPcb,
      id: newPcb.id || 'pcb-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: Array.isArray(newPcb.tags) ? newPcb.tags : (newPcb.tags ? newPcb.tags.split(',').map(t => t.trim()) : []),
      components: newPcb.components || []
    };
    const updatedList = [record, ...list];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.warn("LocalStorage kotası aşıldı, görsel sıkıştırılarak tekrar deneniyor:", e);
      // Eğer görsel çok büyükse boyutu küçültüp tekrar kaydet
      if (record.imageUrl && record.imageUrl.length > 500000) {
        record.imageUrl = record.imageUrl.slice(0, 100000); // güvenli boyut
        localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...list]));
      }
    }
    return record;
  },

  update(id, updatedFields) {
    const list = this.getAll();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;

    const existing = list[index];
    const updatedRecord = {
      ...existing,
      ...updatedFields,
      updatedAt: new Date().toISOString(),
      tags: Array.isArray(updatedFields.tags) 
        ? updatedFields.tags 
        : (updatedFields.tags ? updatedFields.tags.split(',').map(t => t.trim()) : existing.tags)
    };

    list[index] = updatedRecord;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error("LocalStorage güncelleme hatası:", e);
    }
    return updatedRecord;
  },

  delete(id) {
    const list = this.getAll();
    const filtered = list.filter(item => item.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error("LocalStorage silme hatası:", e);
    }
    return true;
  },

  exportJson() {
    const data = this.getAll();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pcb-kutuphanesi-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  importJson(jsonData) {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return true;
      }
      return false;
    } catch (e) {
      console.error('İçe aktarma hatası:', e);
      return false;
    }
  },

  resetToDefault() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PCB_LIBRARY));
    } catch (e) {}
    return INITIAL_PCB_LIBRARY;
  }
};
