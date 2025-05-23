"use client";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

interface OrderData {
  id: number;
  user_id: number;
  package_id: number;
  photo_studio_id: number;
  order_date: string;
  start_time: string;
  end_time: string;
  status: string;
  admin_confirmed: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  package: {
    id: number;
    nama_paket: string;
    harga: string;
    deskripsi: string;
  };
  photo_studio: {
    id: number;
    nama_studio: string;
    longitude: string;
    latitude: string;
    deskripsi_posisi: string;
  };
}

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
    orderData?: OrderData;
  };
}

const Schedule: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Warning';
      case 'confirmed':
        return 'Success';
      case 'completed':
        return 'Primary';
      case 'cancelled':
        return 'Danger';
      default:
        return 'Primary';
    }
  };

  // Function to fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/orders`);
      const orders: OrderData[] = response.data;
      
      // Convert orders to calendar events
      const calendarEvents: CalendarEvent[] = orders.map((order) => {
        const startDateTime = `${order.order_date}T${order.start_time}`;
        const endDateTime = `${order.order_date}T${order.end_time}`;
        
        return {
          id: order.id.toString(),
          title: `${order.user.name} - ${order.package.nama_paket}`,
          start: startDateTime,
          end: endDateTime,
          extendedProps: {
            calendar: getStatusColor(order.status),
            orderData: order,
          },
        };
      });
      
      setEvents(calendarEvents);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load schedule data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    openModal();
  };

  const handleRefresh = () => {
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading schedule...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Photo Session Schedule
        </h2>
        <button
          onClick={handleRefresh}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "timeGridWeek",
            }}
            events={events}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            height="auto"
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
              startTime: '08:00',
              endTime: '18:00',
            }}
          />
        </div>

        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[600px] p-6 lg:p-8"
        >
          <div className="flex flex-col overflow-y-auto custom-scrollbar">
            {selectedEvent?.extendedProps?.orderData && (
              <>
                <div className="mb-6">
                  <h5 className="mb-2 font-semibold text-gray-800 text-xl dark:text-white/90">
                    Booking Details
                  </h5>
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    selectedEvent.extendedProps.orderData.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : selectedEvent.extendedProps.orderData.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedEvent.extendedProps.orderData.status.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        Customer Name
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        {selectedEvent.extendedProps.orderData.user.name}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        Phone
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        {selectedEvent.extendedProps.orderData.user.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Email
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      {selectedEvent.extendedProps.orderData.user.email}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        Package
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        {selectedEvent.extendedProps.orderData.package.nama_paket}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        Price
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        Rp {parseFloat(selectedEvent.extendedProps.orderData.package.harga).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Package Description
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      {selectedEvent.extendedProps.orderData.package.deskripsi}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Studio Location
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      {selectedEvent.extendedProps.orderData.photo_studio.nama_studio} - {selectedEvent.extendedProps.orderData.photo_studio.deskripsi_posisi}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        Date
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        {new Date(selectedEvent.extendedProps.orderData.order_date).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        Start Time
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        {selectedEvent.extendedProps.orderData.start_time.slice(0, 5)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        End Time
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        {selectedEvent.extendedProps.orderData.end_time.slice(0, 5)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm text-xs`}>
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time mr-1 font-medium">{eventInfo.timeText}</div>
      <div className="fc-event-title truncate">{eventInfo.event.title}</div>
    </div>
  );
};

export default Schedule;