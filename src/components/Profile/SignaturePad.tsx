import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Eraser, CheckCircle2, X } from 'lucide-react';

interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
  onCancel: () => void;
  title?: string;
}

export const SignaturePad = ({ onSave, onCancel, title = "Signature électronique" }: SignaturePadProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = 300;
        ctx.strokeStyle = '#5B21B6'; // Theme violet
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setIsEmpty(false);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setIsEmpty(true);
    }
  };

  const save = () => {
    if (isEmpty) return;
    const canvas = canvasRef.current;
    if (canvas) {
      onSave(canvas.toDataURL());
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface p-6 rounded-[32px] card-shadow space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-text-primary">{title}</h3>
        <button onClick={onCancel} className="text-text-secondary active-tap">
          <X size={20} />
        </button>
      </div>

      <p className="text-xs text-text-secondary">
        Veuillez signer à l'intérieur du cadre ci-dessous. Cette signature a une valeur juridique pour la validation de vos documents.
      </p>

      <div className="bg-background rounded-2xl border-2 border-dashed border-border overflow-hidden touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full cursor-crosshair"
        />
      </div>

      <div className="flex gap-4">
        <button 
          onClick={clear}
          className="flex-1 bg-background text-text-secondary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active-tap"
        >
          <Eraser size={18} /> Effacer
        </button>
        <button 
          onClick={save}
          disabled={isEmpty}
          className="flex-2 bg-violet text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active-tap disabled:opacity-50"
        >
          <CheckCircle2 size={18} /> Valider la signature
        </button>
      </div>
    </motion.div>
  );
};
