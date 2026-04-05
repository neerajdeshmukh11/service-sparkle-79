// ============ USERS ============
export const mockUsers = [
  { id: "u1", name: "Alice Johnson", email: "alice@email.com", phone: "+1234567890", status: "active", joinDate: "2024-01-15", bookings: 12 },
  { id: "u2", name: "Bob Smith", email: "bob@email.com", phone: "+1234567891", status: "active", joinDate: "2024-02-20", bookings: 8 },
  { id: "u3", name: "Carol White", email: "carol@email.com", phone: "+1234567892", status: "blocked", joinDate: "2024-03-10", bookings: 3 },
  { id: "u4", name: "David Brown", email: "david@email.com", phone: "+1234567893", status: "active", joinDate: "2024-04-05", bookings: 15 },
  { id: "u5", name: "Eva Green", email: "eva@email.com", phone: "+1234567894", status: "active", joinDate: "2024-05-12", bookings: 6 },
  { id: "u6", name: "Frank Miller", email: "frank@email.com", phone: "+1234567895", status: "inactive", joinDate: "2024-06-01", bookings: 1 },
  { id: "u7", name: "Grace Lee", email: "grace@email.com", phone: "+1234567896", status: "active", joinDate: "2024-07-18", bookings: 9 },
  { id: "u8", name: "Henry Davis", email: "henry@email.com", phone: "+1234567897", status: "active", joinDate: "2024-08-22", bookings: 4 },
];

// ============ PROVIDERS ============
export const mockProviders = [
  { id: "p1", name: "Mike's Plumbing", email: "mike@plumb.com", phone: "+1987654321", category: "Plumbing", rating: 4.8, jobs: 156, status: "active", verified: true, earnings: 45600, joinDate: "2023-06-15" },
  { id: "p2", name: "Sarah's Cleaning", email: "sarah@clean.com", phone: "+1987654322", category: "Cleaning", rating: 4.5, jobs: 203, status: "active", verified: true, earnings: 38900, joinDate: "2023-07-20" },
  { id: "p3", name: "Tom's Electric", email: "tom@electric.com", phone: "+1987654323", category: "Electrical", rating: 3.2, jobs: 89, status: "active", verified: true, earnings: 27800, joinDate: "2023-08-10" },
  { id: "p4", name: "Lisa's Beauty", email: "lisa@beauty.com", phone: "+1987654324", category: "Beauty", rating: 4.9, jobs: 312, status: "active", verified: true, earnings: 62300, joinDate: "2023-05-01" },
  { id: "p5", name: "James Fix-it", email: "james@fixit.com", phone: "+1987654325", category: "Handyman", rating: 2.8, jobs: 45, status: "inactive", verified: false, earnings: 12400, joinDate: "2023-09-15" },
  { id: "p6", name: "Anna's Garden", email: "anna@garden.com", phone: "+1987654326", category: "Gardening", rating: 4.6, jobs: 178, status: "active", verified: true, earnings: 34500, joinDate: "2023-04-20" },
  { id: "p7", name: "Paul's Painting", email: "paul@paint.com", phone: "+1987654327", category: "Painting", rating: 3.9, jobs: 67, status: "active", verified: false, earnings: 19800, joinDate: "2024-01-10" },
  { id: "p8", name: "Karen's Pest Control", email: "karen@pest.com", phone: "+1987654328", category: "Pest Control", rating: 4.3, jobs: 134, status: "active", verified: true, earnings: 41200, joinDate: "2023-11-05" },
];

// ============ CATEGORIES ============
export const mockCategories = [
  { id: "c1", name: "Plumbing", icon: "🔧", description: "Pipe repairs, installations, and maintenance", subServices: 8, status: "active" },
  { id: "c2", name: "Cleaning", icon: "🧹", description: "Home and office cleaning services", subServices: 12, status: "active" },
  { id: "c3", name: "Electrical", icon: "⚡", description: "Wiring, repairs, and installations", subServices: 6, status: "active" },
  { id: "c4", name: "Beauty & Wellness", icon: "💆", description: "Salon, spa, and wellness services", subServices: 15, status: "active" },
  { id: "c5", name: "Handyman", icon: "🔨", description: "General repairs and maintenance", subServices: 10, status: "active" },
  { id: "c6", name: "Gardening", icon: "🌱", description: "Lawn care and landscaping", subServices: 7, status: "active" },
  { id: "c7", name: "Painting", icon: "🎨", description: "Interior and exterior painting", subServices: 5, status: "active" },
  { id: "c8", name: "Pest Control", icon: "🐛", description: "Pest removal and prevention", subServices: 4, status: "active" },
];

// ============ SUB-SERVICES ============
export const mockSubServices = [
  { id: "ss1", categoryId: "c1", name: "Pipe Repair", price: 75, duration: "1-2 hrs", status: "active" },
  { id: "ss2", categoryId: "c1", name: "Drain Cleaning", price: 60, duration: "1 hr", status: "active" },
  { id: "ss3", categoryId: "c1", name: "Water Heater Install", price: 250, duration: "3-4 hrs", status: "active" },
  { id: "ss4", categoryId: "c2", name: "Deep Cleaning", price: 150, duration: "4-6 hrs", status: "active" },
  { id: "ss5", categoryId: "c2", name: "Regular Cleaning", price: 80, duration: "2-3 hrs", status: "active" },
  { id: "ss6", categoryId: "c2", name: "Move-out Cleaning", price: 200, duration: "5-7 hrs", status: "active" },
  { id: "ss7", categoryId: "c3", name: "Wiring Repair", price: 90, duration: "1-2 hrs", status: "active" },
  { id: "ss8", categoryId: "c3", name: "Light Installation", price: 45, duration: "30 min", status: "active" },
  { id: "ss9", categoryId: "c4", name: "Haircut & Styling", price: 50, duration: "1 hr", status: "active" },
  { id: "ss10", categoryId: "c4", name: "Facial Treatment", price: 80, duration: "1.5 hrs", status: "active" },
  { id: "ss11", categoryId: "c5", name: "Furniture Assembly", price: 65, duration: "1-2 hrs", status: "active" },
  { id: "ss12", categoryId: "c6", name: "Lawn Mowing", price: 40, duration: "1 hr", status: "active" },
];

// ============ BOOKINGS ============
export const mockBookings = [
  { id: "b1", customerId: "u1", customerName: "Alice Johnson", providerId: "p1", providerName: "Mike's Plumbing", service: "Pipe Repair", category: "Plumbing", date: "2024-12-01", time: "10:00 AM", status: "completed", amount: 75, paymentStatus: "paid" },
  { id: "b2", customerId: "u2", customerName: "Bob Smith", providerId: "p2", providerName: "Sarah's Cleaning", service: "Deep Cleaning", category: "Cleaning", date: "2024-12-02", time: "9:00 AM", status: "in-progress", amount: 150, paymentStatus: "pending" },
  { id: "b3", customerId: "u4", customerName: "David Brown", providerId: "p4", providerName: "Lisa's Beauty", service: "Haircut & Styling", category: "Beauty", date: "2024-12-03", time: "2:00 PM", status: "confirmed", amount: 50, paymentStatus: "pending" },
  { id: "b4", customerId: "u5", customerName: "Eva Green", providerId: "p3", providerName: "Tom's Electric", service: "Wiring Repair", category: "Electrical", date: "2024-12-04", time: "11:00 AM", status: "cancelled", amount: 90, paymentStatus: "refunded" },
  { id: "b5", customerId: "u7", customerName: "Grace Lee", providerId: "p6", providerName: "Anna's Garden", service: "Lawn Mowing", category: "Gardening", date: "2024-12-05", time: "8:00 AM", status: "completed", amount: 40, paymentStatus: "paid" },
  { id: "b6", customerId: "u1", customerName: "Alice Johnson", providerId: "p8", providerName: "Karen's Pest Control", service: "Pest Inspection", category: "Pest Control", date: "2024-12-06", time: "3:00 PM", status: "pending", amount: 120, paymentStatus: "pending" },
  { id: "b7", customerId: "u8", customerName: "Henry Davis", providerId: "p7", providerName: "Paul's Painting", service: "Interior Painting", category: "Painting", date: "2024-12-07", time: "9:00 AM", status: "completed", amount: 350, paymentStatus: "paid" },
  { id: "b8", customerId: "u2", customerName: "Bob Smith", providerId: "p1", providerName: "Mike's Plumbing", service: "Drain Cleaning", category: "Plumbing", date: "2024-12-08", time: "1:00 PM", status: "confirmed", amount: 60, paymentStatus: "pending" },
];

// ============ TRANSACTIONS ============
export const mockTransactions = [
  { id: "t1", bookingId: "b1", customer: "Alice Johnson", provider: "Mike's Plumbing", amount: 75, platformFee: 11.25, providerEarning: 63.75, method: "Credit Card", status: "completed", date: "2024-12-01", flagged: false },
  { id: "t2", bookingId: "b5", customer: "Grace Lee", provider: "Anna's Garden", amount: 40, platformFee: 6.00, providerEarning: 34.00, method: "UPI", status: "completed", date: "2024-12-05", flagged: false },
  { id: "t3", bookingId: "b7", customer: "Henry Davis", provider: "Paul's Painting", amount: 350, platformFee: 52.50, providerEarning: 297.50, method: "Credit Card", status: "completed", date: "2024-12-07", flagged: false },
  { id: "t4", bookingId: "b4", customer: "Eva Green", provider: "Tom's Electric", amount: 90, platformFee: 0, providerEarning: 0, method: "Credit Card", status: "refunded", date: "2024-12-04", flagged: false },
  { id: "t5", bookingId: "b99", customer: "Unknown", provider: "Mike's Plumbing", amount: 5000, platformFee: 750, providerEarning: 4250, method: "Credit Card", status: "completed", date: "2024-12-06", flagged: true },
  { id: "t6", bookingId: "b98", customer: "Bob Smith", provider: "Sarah's Cleaning", amount: 3200, platformFee: 480, providerEarning: 2720, method: "UPI", status: "pending", date: "2024-12-08", flagged: true },
];

// ============ COMPLAINTS ============
export const mockComplaints = [
  { id: "cmp1", bookingId: "b4", raisedBy: "Eva Green", raisedByRole: "customer", against: "Tom's Electric", issue: "Provider arrived 2 hours late and work was incomplete", status: "open", priority: "high", date: "2024-12-04", resolution: "" },
  { id: "cmp2", bookingId: "b2", raisedBy: "Bob Smith", raisedByRole: "customer", against: "Sarah's Cleaning", issue: "Cleaning quality was below expected standards", status: "in-review", priority: "medium", date: "2024-12-03", resolution: "" },
  { id: "cmp3", bookingId: "b1", raisedBy: "Mike's Plumbing", raisedByRole: "provider", against: "Alice Johnson", issue: "Customer was not available at scheduled time", status: "resolved", priority: "low", date: "2024-12-02", resolution: "Customer apologized, rescheduled successfully" },
  { id: "cmp4", bookingId: "b7", raisedBy: "Henry Davis", raisedByRole: "customer", against: "Paul's Painting", issue: "Paint color was different from what was agreed upon", status: "open", priority: "high", date: "2024-12-08", resolution: "" },
];

// ============ PROMOTIONS ============
export const mockPromotions = [
  { id: "promo1", title: "New Year Special", description: "20% off on all cleaning services", discount: 20, type: "percentage", validFrom: "2025-01-01", validTo: "2025-01-31", status: "active", usageCount: 45 },
  { id: "promo2", title: "First Booking Offer", description: "$10 off on first booking", discount: 10, type: "fixed", validFrom: "2024-01-01", validTo: "2025-12-31", status: "active", usageCount: 230 },
  { id: "promo3", title: "Summer Sale", description: "15% off on gardening services", discount: 15, type: "percentage", validFrom: "2024-06-01", validTo: "2024-08-31", status: "expired", usageCount: 89 },
];

// ============ COUPONS ============
export const mockCoupons = [
  { id: "coup1", code: "WELCOME10", discount: 10, type: "percentage", minOrder: 50, maxDiscount: 20, validTo: "2025-06-30", status: "active", usageCount: 156, maxUsage: 500 },
  { id: "coup2", code: "FLAT25", discount: 25, type: "fixed", minOrder: 100, maxDiscount: 25, validTo: "2025-03-31", status: "active", usageCount: 78, maxUsage: 200 },
  { id: "coup3", code: "CLEAN50", discount: 50, type: "percentage", minOrder: 200, maxDiscount: 100, validTo: "2024-12-31", status: "expired", usageCount: 45, maxUsage: 100 },
];

// ============ NOTIFICATIONS ============
export const mockNotifications = [
  { id: "n1", title: "Booking Confirmed", message: "Your booking #b3 has been confirmed", target: "customer", type: "booking", date: "2024-12-03", read: false },
  { id: "n2", title: "New Job Available", message: "A new plumbing job is available in your area", target: "provider", type: "job", date: "2024-12-06", read: false },
  { id: "n3", title: "Payment Received", message: "Payment of $75 received for booking #b1", target: "provider", type: "payment", date: "2024-12-01", read: true },
  { id: "n4", title: "Rating Received", message: "You received a 5-star rating from Alice Johnson", target: "provider", type: "rating", date: "2024-12-02", read: true },
  { id: "n5", title: "Complaint Update", message: "Your complaint #cmp2 is being reviewed", target: "customer", type: "complaint", date: "2024-12-04", read: false },
];

// ============ REPORTS / STATS ============
export const mockDashboardStats = {
  admin: {
    totalUsers: 1250,
    totalProviders: 340,
    totalBookings: 8945,
    totalRevenue: 524600,
    activeBookings: 156,
    pendingComplaints: 23,
    monthlyGrowth: 12.5,
    revenueGrowth: 18.3,
  },
  provider: {
    totalJobs: 156,
    completedJobs: 142,
    activeJobs: 8,
    walletBalance: 4560,
    rating: 4.8,
    totalEarnings: 45600,
    weeklyEarnings: 1200,
    monthlyEarnings: 5400,
  },
  customer: {
    totalBookings: 12,
    activeBookings: 2,
    completedBookings: 9,
    cancelledBookings: 1,
    totalSpent: 1250,
  },
};

export const monthlyRevenueData = [
  { month: "Jan", revenue: 35000, bookings: 580 },
  { month: "Feb", revenue: 38000, bookings: 620 },
  { month: "Mar", revenue: 42000, bookings: 700 },
  { month: "Apr", revenue: 39000, bookings: 650 },
  { month: "May", revenue: 45000, bookings: 750 },
  { month: "Jun", revenue: 48000, bookings: 800 },
  { month: "Jul", revenue: 52000, bookings: 870 },
  { month: "Aug", revenue: 49000, bookings: 820 },
  { month: "Sep", revenue: 46000, bookings: 770 },
  { month: "Oct", revenue: 51000, bookings: 850 },
  { month: "Nov", revenue: 54000, bookings: 900 },
  { month: "Dec", revenue: 58000, bookings: 970 },
];

export const categoryDistribution = [
  { name: "Cleaning", value: 30 },
  { name: "Plumbing", value: 20 },
  { name: "Electrical", value: 15 },
  { name: "Beauty", value: 18 },
  { name: "Gardening", value: 10 },
  { name: "Others", value: 7 },
];

// ============ PROVIDER JOBS (for provider portal) ============
export const mockProviderJobs = [
  { id: "j1", customer: "Alice Johnson", service: "Pipe Repair", address: "123 Main St, Apt 4", date: "2024-12-10", time: "10:00 AM", status: "pending", amount: 75, customerPhone: "+1234567890" },
  { id: "j2", customer: "Bob Smith", service: "Drain Cleaning", date: "2024-12-11", time: "2:00 PM", address: "456 Oak Ave", status: "accepted", amount: 60, customerPhone: "+1234567891", stage: "en-route" },
  { id: "j3", customer: "David Brown", service: "Water Heater Install", date: "2024-12-12", time: "9:00 AM", address: "789 Pine Rd", status: "accepted", amount: 250, customerPhone: "+1234567893", stage: "arrived" },
  { id: "j4", customer: "Grace Lee", service: "Pipe Repair", date: "2024-12-08", time: "11:00 AM", address: "321 Elm St", status: "completed", amount: 75, customerPhone: "+1234567896" },
  { id: "j5", customer: "Henry Davis", service: "Drain Cleaning", date: "2024-12-05", time: "3:00 PM", address: "654 Maple Dr", status: "completed", amount: 60, customerPhone: "+1234567897" },
];

// ============ RATINGS / REVIEWS ============
export const mockReviews = [
  { id: "r1", bookingId: "b1", customer: "Alice Johnson", provider: "Mike's Plumbing", rating: 5, comment: "Excellent work! Fixed the pipe quickly and professionally.", date: "2024-12-01" },
  { id: "r2", bookingId: "b5", customer: "Grace Lee", provider: "Anna's Garden", rating: 4, comment: "Good job with the lawn. Could improve edging.", date: "2024-12-05" },
  { id: "r3", bookingId: "b7", customer: "Henry Davis", provider: "Paul's Painting", rating: 3, comment: "Decent work but the color wasn't exactly what I wanted.", date: "2024-12-07" },
];

// ============ WALLET TRANSACTIONS (provider) ============
export const mockWalletTransactions = [
  { id: "w1", type: "credit", description: "Payment for Pipe Repair - Alice Johnson", amount: 63.75, date: "2024-12-01", balance: 4560 },
  { id: "w2", type: "credit", description: "Payment for Drain Cleaning - Grace Lee", amount: 34.00, date: "2024-12-05", balance: 4496.25 },
  { id: "w3", type: "debit", description: "Withdrawal to Bank Account", amount: 2000, date: "2024-12-03", balance: 4462.25 },
  { id: "w4", type: "credit", description: "Payment for Pipe Repair - David Brown", amount: 63.75, date: "2024-12-08", balance: 2462.25 },
  { id: "w5", type: "credit", description: "Bonus - Top performer of the week", amount: 50, date: "2024-12-07", balance: 2526 },
];

// ============ CHAT MESSAGES ============
export const mockChatMessages = [
  { id: "m1", senderId: "u1", senderName: "Alice Johnson", message: "Hi, I have a leaking pipe in the kitchen", timestamp: "2024-12-10 09:30", role: "customer" as const },
  { id: "m2", senderId: "p1", senderName: "Mike's Plumbing", message: "Hello Alice! I'll be there at 10 AM. Can you send a photo of the leak?", timestamp: "2024-12-10 09:32", role: "provider" as const },
  { id: "m3", senderId: "u1", senderName: "Alice Johnson", message: "Sure, here's the photo. It's under the sink.", timestamp: "2024-12-10 09:35", role: "customer" as const },
  { id: "m4", senderId: "p1", senderName: "Mike's Plumbing", message: "Got it! Looks like a simple fix. I'll bring the right tools. See you soon!", timestamp: "2024-12-10 09:37", role: "provider" as const },
];
