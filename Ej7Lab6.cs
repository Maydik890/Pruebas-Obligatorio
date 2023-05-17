//1) Dado un monto retornar todas las emisiones que lo superen, ordenados por monto.

//Sistema

public List<Emision> GetEmisionesMayoresAMonto(double monto)
{
	List<Emision> listaRet = new List<Emision>();
	
	foreach(Emision e in _emisiones)
	{
		if(e.Recaudacion > monto)
		{
			listaRet.Add(e);
		}
	}
	listaRet.Sort();
	return listaRet;
}

//Emision

public int CompareTo(Emision other)
{
	return _recaudacion.CompareTo(other.Recaudacion);
}

//Emision

public void CalcularRecaudacion()
{
	if(_recaudacion.Equals(0))
	{
		double gastado = CalcularGastoFuncionarios();
		double ganado = _auspiciante.CalcularDineroACobrar(_cantEspectadores);
		
		_recaudacion = ganado - gastado;
	}
}

//Emision

private double CalcularGastoFuncionarios()
{
	double gastoTotal = 0;
	
	foreach(FuncionarioEmision fe in _funcionariosEmision)
	{
		gastoTotal += fe.Sueldo;
	}
	return gastoTotal;
}

//Auspiciante

public abstract double CalcularDineroACobrar(int cantEspectadores);

//Comercial

public override double CalcularDineroACobrar (int cantEspectadores)
{
	if(cantEspectadores > 5000)
	{
		return _precio += * 1.2;
	}
	return _precio;
}

//Publico

public override double CalcularDineroACobrar(int cantEspectadores)
{
	if(cantEspectadores > 5000)
	{
		_costoBase += * 1.05;
	}
	return _costoBase;
}

//2) Dadas dos fechas y un rol retornar los funcionarios que cumplieron ese rol en alguna emisión entre esas fechas. Si el mismo funcionario participó más de una vez no se debe repetir en la lista.

//Sistema

public List<Funcionario> GetFuncionariosEnEmisionesRolYFechas (DateTime f1, DateTime f2, string rol)
{
	List<Funcionario> listaRet = new List<Funcionario>();
	
	if(f1 > f2)
	{
		DateTime fechaAux = f2;
		f2 = f1;
		f1 = fechaAux;
	}
	
	foreach(Emision e in _emisiones)
	{
		if(e.Fecha > f1 && e.Fecha < f2)
		{
			List<Funcionario> listaAux = e.GetFuncionariosSegunRol(rol, listaRet); //Le paso la lista para que haga el Contains
			listaRet.AddRange(listaAux);	
		}
	}
	return listaRet;
}

//Emision

public List<Funcionario> GetFuncionariosSegunRol(string rol, List<Funcionario> listaFuncionarios)
{
	List<Funcionario> listaRetorno = new List<Funcionario>();
	
	foreach(FuncionarioEmision fe in _funcionariosEmision)
	{
		if(fe.Rol.Equals(rol) && !listaFuncionarios.Contains(fe.Funcionario))
		{
			listaRetorno.Add(fe.Funcionario);
		}
	}
	return listaRetorno;
}

