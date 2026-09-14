'use client';

import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook for drag-and-drop reordering of items in a list.
 * Uses HTML5 Drag and Drop API.
 */
export function useDragReorder(items, onReorder) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragNode = useRef(null);

  const handleDragStart = useCallback((e, index) => {
    setDraggedIndex(index);
    dragNode.current = e.target;
    e.target.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
    // Needed for Firefox
    e.dataTransfer.setData('text/plain', index.toString());
  }, []);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, []);

  const handleDragEnter = useCallback((e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback((e) => {
    // Only clear if leaving the actual target
    if (e.target === dragNode.current) return;
  }, []);

  const handleDrop = useCallback((e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, removed);
    onReorder(newItems);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, [draggedIndex, items, onReorder]);

  const handleDragEnd = useCallback((e) => {
    e.target.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
    dragNode.current = null;
  }, []);

  return {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
}
