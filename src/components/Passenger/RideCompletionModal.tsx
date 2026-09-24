import { CheckCircle2, Download, Heart, Star, ThumbsUp, X } from 'lucide-react';
import React, { useState } from 'react';
import { useRide } from '../../context/RideContext';
import { formatCurrency } from '../../utils/geo';

export const RideCompletionModal: React.FC = () => {
  const { currentRide, rateAndTipRide, drivers } = useRide();
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Clean Car 🧼', 'Safe Driving 🛡️']);

  const feedbackTags = [
    'Clean Car 🧼',
    'Polite Driver 😊',
    'Safe Driving 🛡️',
    'Great Service 🌟',
    'On Time ⏰',
    'Comfortable Ride 🚘',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  if (!currentRide || currentRide.status !== 'completed') return null;

  const assignedDriver = (currentRide.assignedDriverId ? drivers.find((d) => d.id === currentRide.assignedDriverId) : null) || drivers[0] || {
    id: 'live_driver',
    name: 'Wadaage Driver Captain',
    phone: '+252 63 6807814',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5.0,
    vehicle: { model: 'Toyota Vitz', licensePlate: 'SL-24810', color: 'White' },
  };
  const finalTip = customTip ? parseFloat(customTip) || 0 : tip;

  const handleSubmit = () => {
    rateAndTipRide(rating, finalTip);
  };

  const handleSkipAndClose = () => {
    rateAndTipRide(rating, 0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-5 text-center">
        {/* Success Icon Header */}
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">You've Arrived!</h2>
          <p className="text-xs text-slate-500 mt-1">
            Thank you for riding with us. You reached <b>{currentRide.dropoff?.name || 'your destination'}</b>.
          </p>
        </div>

        {/* Fare Summary Card */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-xs">
          <div className="text-left space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Total Fare</span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              {(currentRide.paymentMethod || 'cash').toUpperCase()} • Personal
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {formatCurrency(Number(currentRide.totalFare) || 0)}
            </span>
          </div>
        </div>

        {/* Rate Driver Section */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-center space-x-3">
            <img
              src={assignedDriver.avatar}
              alt={assignedDriver.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
            />
            <div className="text-left">
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                {assignedDriver.name}
              </div>
              <div className="text-xs text-slate-500 font-medium">{assignedDriver.vehicle.model} • {assignedDriver.vehicle.licensePlate}</div>
            </div>
          </div>

          <div className="flex justify-center space-x-2 py-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1 transition-transform hover:scale-115 active:scale-95 cursor-pointer"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? 'text-amber-400 fill-amber-400 drop-shadow-xs' : 'text-slate-300 dark:text-slate-700'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Quick Feedback Tags */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Compliments & Feedback</span>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {feedbackTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 shadow-xs border border-emerald-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tip Driver Option */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block flex items-center justify-center space-x-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Add a Driver Tip (Optional)</span>
          </label>

          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 5].map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setTip(amt);
                  setCustomTip('');
                }}
                className={`py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                  tip === amt && !customTip
                    ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {amt === 0 ? 'No Tip' : `$${amt}`}
              </button>
            ))}
          </div>
        </div>

        {/* Receipt Download Action */}
        <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setShowReceipt(true)}
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 font-semibold flex items-center space-x-1"
          >
            <Download className="w-4 h-4 text-emerald-500" />
            <span>View Detailed Digital Receipt</span>
          </button>
        </div>

        {/* Submit */}
        <div className="space-y-2">
          <button
            onClick={handleSubmit}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-3 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
          >
            SUBMIT & RETURN TO HOME
          </button>
          <button
            onClick={handleSkipAndClose}
            className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2 rounded-xl text-xs transition"
          >
            SKIP & RETURN TO HOME
          </button>
        </div>
      </div>

      {/* Digital Receipt Overlay Modal */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-left font-sans">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-lg">Official Ride Receipt</h3>
                <p className="text-xs text-slate-500">Trip ID: #{currentRide.id}</p>
              </div>
              <button
                onClick={() => setShowReceipt(false)}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs border-b pb-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Passenger:</span>
                <span className="font-bold">{currentRide.passengerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Driver:</span>
                <span className="font-bold">{assignedDriver.name} ({assignedDriver.vehicle.licensePlate})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup:</span>
                <span className="font-semibold">{currentRide.pickup?.name || 'Pickup Location'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dropoff:</span>
                <span className="font-semibold">{currentRide.dropoff?.name || 'Dropoff Destination'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Distance & Time:</span>
                <span>{currentRide.distanceKm} km • {currentRide.durationMins} mins</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs border-b pb-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Base & Distance Fare:</span>
                <span>{formatCurrency(currentRide.baseFare + currentRide.distanceKm * 1.25)}</span>
              </div>
              {currentRide.surgeMultiplier > 1.0 && (
                <div className="flex justify-between text-amber-600">
                  <span>Surge Multiplier ({currentRide.surgeMultiplier}x):</span>
                  <span>Applied</span>
                </div>
              )}
              {currentRide.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount / Shared Savings:</span>
                  <span>-{formatCurrency(currentRide.discountAmount)}</span>
                </div>
              )}
              {finalTip > 0 && (
                <div className="flex justify-between text-slate-700">
                  <span>Driver Tip:</span>
                  <span>+{formatCurrency(finalTip)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-1 text-sm font-black">
              <span>Total Paid ({((currentRide.paymentMethod || 'cash')).toUpperCase()}):</span>
              <span className="text-emerald-600 text-lg">
                {formatCurrency((Number(currentRide.totalFare) || 0) + finalTip)}
              </span>
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
