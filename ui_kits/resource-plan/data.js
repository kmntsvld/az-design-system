/* Sample data for the Resource Plan UI kit — cosmetic recreation.
   Employees × 12-month FTE% allocations, grouped by project/department. */
window.RP_MONTHS = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
window.RP_CUR_MONTH = 4;   // Май (0-indexed)
window.RP_CUR_YEAR  = 2026;

window.RP_EMPLOYEES = [
  { id:'e1', name:'Куманцов Владислав Евгеньевич', role:'PMO D&D',      dept:'PMO',    type:'Staff' },
  { id:'e2', name:'Алмаев Тахир Георгиевич',       role:'Scrum Master', dept:'PMO',    type:'OSP' },
  { id:'e3', name:'Балагуров Егор Сергеевич',      role:'Scrum Master', dept:'PMO',    type:'OSP' },
  { id:'e4', name:'Соколова Мария Андреевна',      role:'Data Engineer',dept:'Data',   type:'Staff' },
  { id:'e5', name:'Петров Илья Сергеевич',         role:'ML Engineer',  dept:'AI',     type:'Staff' },
  { id:'e6', name:'Громова Анна Викторовна',       role:'Product Owner',dept:'Digital',type:'Staff' },
  { id:'e7', name:'Зайцев Дмитрий Олегович',       role:'Frontend Dev', dept:'Digital',type:'OSP' },
  { id:'e8', name:'Морозов Никита Павлович',       role:'Data Analyst', dept:'Data',   type:'OSP' },
  { id:'e9', name:'Лебедева Ольга Игоревна',       role:'ML Engineer',  dept:'AI',     type:'Staff' },
  { id:'e10',name:'Васильев Артём Романович',      role:'Backend Dev',  dept:'Digital',type:'Staff' },
];

window.RP_PROJECTS = [
  { id:'p1', name:'Digital Ecosystem',              dept:'Digital' },
  { id:'p2', name:'Innovative approach on D&D PM',  dept:'PMO' },
  { id:'p3', name:'AI Copilot for Medical Affairs', dept:'AI' },
  { id:'p4', name:'Unified Data Platform',          dept:'Data' },
];

// fte: 12-month %. helper to build flat then taper for "releasing" demo.
const F = (a) => a;
window.RP_ALLOCS = [
  { id:'a1', pid:'p2', eid:'e1', role:'PMO D&D',      fte:F([82,82,82,82,82,82,82,82,82,82,82,82]) },
  { id:'a2', pid:'p1', eid:'e2', role:'Scrum Master', fte:F([100,100,100,100,100,100,100,100,100,100,100,100]) },
  { id:'a3', pid:'p1', eid:'e3', role:'Scrum Master', fte:F([60,60,60,60,45,30,0,0,0,0,0,0]) },
  { id:'a4', pid:'p4', eid:'e4', role:'Data Engineer',fte:F([90,90,90,90,90,90,80,80,70,70,60,60]) },
  { id:'a5', pid:'p3', eid:'e5', role:'ML Engineer',  fte:F([70,70,80,90,110,110,100,90,80,70,60,50]) },
  { id:'a6', pid:'p1', eid:'e6', role:'Product Owner',fte:F([50,50,50,50,50,50,50,50,50,50,50,50]) },
  { id:'a7', pid:'p3', eid:'e6', role:'Product Owner',fte:F([40,40,40,45,55,55,50,45,40,40,40,40]) },
  { id:'a8', pid:'p1', eid:'e7', role:'Frontend Dev', fte:F([100,100,100,90,75,60,40,20,0,0,0,0]) },
  { id:'a9', pid:'p4', eid:'e8', role:'Data Analyst', fte:F([30,30,30,35,40,40,40,40,40,40,40,40]) },
  { id:'a10',pid:'p3', eid:'e9', role:'ML Engineer',  fte:F([80,85,90,95,100,100,100,100,95,90,85,80]) },
  { id:'a11',pid:'p1', eid:'e10',role:'Backend Dev',  fte:F([60,60,60,60,60,60,60,60,60,60,60,60]) },
  { id:'a12',pid:'p4', eid:'e10',role:'Backend Dev',  fte:F([30,30,30,30,45,45,45,45,45,45,45,45]) },
];

window.RP_DEPT_LABELS = { 'AI':'AI', 'Innovations&AI':'AI' };
