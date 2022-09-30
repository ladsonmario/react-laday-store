export const convertRealFormat = (value: number) => {
    return Intl.NumberFormat(
        'pt-br', 
        { style: 'currency', currency: 'BRL' }
    ).format(value);     
}

export const formatDate = (date: Date) => {
    const d = new Date(date);
    const months: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();

    return `${day} de ${months[month]} de ${year}`;
}