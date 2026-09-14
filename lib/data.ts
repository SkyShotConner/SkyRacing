import { supabase } from './supabase';

export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*, venues(*), seasons(*, championships(*))')
    .order('start_date', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getEvent(slug: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*, venues(*), seasons(*, championships(*)), event_classes(*, racing_classes(*)), sessions(*, racing_classes(*))')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPilots() {
  const { data, error } = await supabase.from('pilots').select('*').order('name');
  if (error) throw error;
  return data ?? [];
}

export async function getAircraft() {
  const { data, error } = await supabase
    .from('aircraft')
    .select('*, aircraft_models(*), racing_classes(*), pilots!aircraft_current_pilot_id_fkey(*)')
    .order('racing_number', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getResults() {
  const { data, error } = await supabase
    .from('results')
    .select('*, sessions(name, events(name, slug)), entries(racing_number, pilots(name), aircraft(name, slug))')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getStandings() {
  const { data, error } = await supabase
    .from('standings')
    .select('*, pilots(name, slug), teams(name, slug), racing_classes(name, short_name), seasons(year, championships(name))')
    .order('position');
  if (error) throw error;
  return data ?? [];
}

export async function getClasses() {
  const { data, error } = await supabase.from('racing_classes').select('*').order('name');
  if (error) throw error;
  return data ?? [];
}
