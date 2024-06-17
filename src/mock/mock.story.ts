import type { Story } from '@/types'

export const stories: Story[] = [
  { id: 1, title: 'Truyện Khoa học 1', id_genre: 1, type: 'comic' },
  { id: 2, title: 'Truyện Lịch sử 1', id_genre: 2, type: 'comic' },
  { id: 3, title: 'Truyện Cổ đại 1', id_genre: 3, type: 'novel' }
]

export const popularStories: Story[] = [
  { id: 1, title: 'Truyện Khoa học 1', id_genre: 1, type: 'comic', views: 123 },
  { id: 2, title: 'Truyện Lịch sử 1', id_genre: 2, type: 'comic', views: 123 }
]

export const newStories: Story[] = [
  { id: 1, title: 'Truyện Khoa học 1', id_genre: 1, type: 'comic' },
  { id: 2, title: 'Truyện Lịch sử 1', id_genre: 2, type: 'comic' }
]
