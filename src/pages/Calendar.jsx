import CalendarList from "../components/lists/CalendarList";

export default function Calendar() {
  return (
    <div className='px-6 pt-8 pb-20'>
      <h1 className='text-elevated text-4xl font-semibold px-2 mb-8'>
        Calendar
      </h1>
      <CalendarList />
    </div>
  )
}
